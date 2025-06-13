import React, { useEffect, useState, useCallback } from 'react'; // useCallbackをインポート
import { Connection, PublicKey } from '@solana/web3.js';
import { fetchTokenBalance } from '../api/solana';
import { safePublicKey } from '../utils/safePublicKey';
import TokenSelector, { Token } from './TokenSelector';
import './SwapInterface.css';
// ★変更点：jupiter.tsから新しい関数と型をインポート
import { fetchJupiterQuote, JupiterQuoteResponse } from '../api/jupiter';

const RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';

const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: 'SOL',
    logoUrl: '/token-logos/sol.svg',
    mintAddress: 'So11111111111111111111111111111111111111112',
    decimals: 9, // ★変更点：各トークンのdecimalsを追加
  },
  {
    symbol: 'USDC',
    logoUrl: '/token-logos/usdc.svg',
    mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
  },
];

// debounce関数の定義
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}


export default function SwapInterface({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const [fromToken, setFromToken] = useState<Token>(SUPPORTED_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(SUPPORTED_TOKENS[1]);

  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quote, setQuote] = useState<JupiterQuoteResponse | null>(null); // ★変更点：Quoteレスポンスをstateで管理
  const [isFetchingQuote, setIsFetchingQuote] = useState(false); // ★変更点：レート取得中のstateを追加

  const connection = new Connection(RPC_ENDPOINT);

  // （残高取得のuseEffectは変更なし）
  useEffect(() => {
    if (!walletAddress || !fromToken) {
      setBalance(null);
      return;
    }
    setLoading(true);
    setBalance(null);
    const ownerKey = safePublicKey(walletAddress);
    const mintKey = safePublicKey(fromToken.mintAddress);
    if (!ownerKey || !mintKey) {
      setLoading(false);
      return;
    }
    fetchTokenBalance(connection, ownerKey, mintKey)
      .then((bal) => setBalance(bal))
      .catch((err) => {
        console.error('残高取得エラー', err);
        setBalance(null);
      })
      .finally(() => setLoading(false));
  }, [walletAddress, fromToken]);


  // ★★★ ここから下が主な変更点 ★★★

  // レートを取得する関数
  const getQuote = async (amount: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      setToAmount('');
      setQuote(null);
      return;
    }
    setIsFetchingQuote(true);
    
    // トークンの最小単位に変換
    const amountInSmallestUnit = parseFloat(amount) * (10 ** fromToken.decimals);

    const fetchedQuote = await fetchJupiterQuote(
      fromToken.mintAddress,
      toToken.mintAddress,
      Math.floor(amountInSmallestUnit)
    );

    if (fetchedQuote) {
      // 取得した値をUI表示用に変換
      const outAmountInUI = parseInt(fetchedQuote.outAmount) / (10 ** toToken.decimals);
      setToAmount(outAmountInUI.toString());
      setQuote(fetchedQuote);
    } else {
      setToAmount('');
      setQuote(null);
    }
    setIsFetchingQuote(false);
  };

  // ユーザーの入力を待ってからAPIを叩くためのdebounce処理
  const debouncedGetQuote = useCallback(debounce(getQuote, 500), [fromToken, toToken]);

  // fromAmountが変更されたら、debouncedGetQuoteを呼び出す
  useEffect(() => {
    debouncedGetQuote(fromAmount);
  }, [fromAmount, debouncedGetQuote]);

  // トークンの上下を入れ替える関数
  const handleSwapTokens = () => {
    const tempFromToken = fromToken;
    const tempToToken = toToken;
    const tempFromAmount = fromAmount;
    const tempToAmount = toAmount;
    
    setFromToken(tempToToken);
    setToToken(tempFromToken);
    setFromAmount(tempToAmount);
    setToAmount(tempFromAmount); // toAmountは再計算されるのでクリアしても良い
  };

  // ウォレット未接続時の表示は変更なし
  if (!walletAddress) {
    return (
      <div className="swap-card-large">
        <h2 className="swap-title">Swap</h2>
        <div className="text-center text-gray-400 py-8">
          ウォレットを接続してください
        </div>
      </div>
    );
  }

  return (
    <div className="swap-card-large">
      <h2 className="swap-title">Swap</h2>

      {/* 「支払う」セクション */}
      <div className="swap-box">
        <div className="box-header">
          <span>From</span>
          <span className="text-xs">
            Balance: {loading ? '...' : balance?.toFixed(4) ?? '0.00'}
          </span>
        </div>
        <div className="box-body">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            className="swap-input"
          />
          <TokenSelector selected={fromToken} onSelect={setFromToken} />
        </div>
      </div>

      {/* トークン入れ替えボタン */}
      <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
        <button
          onClick={handleSwapTokens}
          style={{
            background: '#333',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
          }}
        >
          ↓
        </button>
      </div>

      {/* 「受け取る」セクション */}
      <div className="swap-box">
        <div className="box-header">
          <span>To (Estimated)</span>
        </div>
        <div className="box-body">
          <input
            type="number"
            value={isFetchingQuote ? '...' : toAmount} // ★変更点：レート取得中は'...'を表示
            readOnly
            placeholder="0.0"
            className="swap-input"
          />
          <TokenSelector selected={toToken} onSelect={setToToken} />
        </div>
      </div>
      
      <div className="h-4"></div> {/* ボタンとの間のスペース */}

      <button className="swap-button-large">Swap</button>
    </div>
  );
}