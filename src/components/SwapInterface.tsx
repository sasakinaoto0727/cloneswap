// src/components/SwapInterface.tsx
import React, { useEffect, useState } from 'react';
// import { Connection, PublicKey } from '@solana/web3.js'; // 今回は使わないのでコメントアウトも可
// import { fetchTokenBalance } from '../api/solana'; // 今回は使わないのでコメントアウトも可
// import { safePublicKey } from '../utils/safePublicKey'; // 今回は使わないのでコメントアウトも可
import TokenSelector, { Token } from './TokenSelector'; // TokenSelector はUI編集で使う可能性があるので残します
import './SwapInterface.css';

// const RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com'; // 今回は使わない

export default function SwapInterface({
  walletAddress, // walletAddress prop は残しておきますが、今回は使用しません
}: {
  walletAddress: string;
}) {
  // UI編集のためにダミーの残高を設定します。必要に応じて変更してください。
  const [balance, setBalance] = useState<number | null>(12.345678); // 例: 12.345678 SOL
  // const connection = new Connection(RPC_ENDPOINT); // 今回は使わない

  /*
  // ↓↓↓↓ ここから残高取得ロジックをコメントアウトします ↓↓↓↓
  useEffect(() => {
    const ownerKey = safePublicKey(walletAddress);
    if (!ownerKey) {
      console.error('無効なウォレットアドレス', walletAddress);
      setBalance(null);
      return;
    }
    // 例として SOL 残高を取得
    const SOL_MINT = new PublicKey(
      'So11111111111111111111111111111111111111112'
    );

    fetchTokenBalance(connection, ownerKey, SOL_MINT)
      .then((bal) => setBalance(bal))
      .catch((err) => {
        console.error('残高取得エラー', err);
        setBalance(null);
      });
  }, [walletAddress]);
  // ↑↑↑↑ ここまで残高取得ロジックをコメントアウトします ↑↑↑↑
  */

  // ↓↓↓↓ ローディング表示の条件分岐をコメントアウトし、常にUIが表示されるようにします ↓↓↓↓
  /*
  if (balance === null) {
    return <div className="swap-card-large">アドレスが無効か残高取得中...</div>;
  }
  */
  // ↑↑↑↑ ローディング表示の条件分岐をコメントアウトします ↑↑↑↑

  // UI編集用の仮データや表示。ここをUniswap/Sushiswap風に編集していきます。
  // 例えば、'支払う'トークンと'受け取る'トークンのセクションを作るなど。
  // TokenSelectorコンポーネントもここに組み込んでいきます。

  const dummyFromToken: Token = { symbol: 'SOL', logoUrl: '/token-logos/sol.svg' };
  // const dummyToToken: Token = { symbol: 'USDC', logoUrl: '/token-logos/usdc.svg' }; // 将来的に使用

  return (
    <div className="swap-card-large">
      <h2 className="swap-title">Swap</h2>

      {/* --- 「支払う」セクション (UI編集の開始点) --- */}
      <div className="swap-box">
        <div className="box-header">
          <span>From</span>
          {/* 残高表示 (ダミー) */}
          <span className="text-xs">Balance: {balance !== null ? balance.toFixed(4) : '0.00'}</span>
        </div>
        <div className="box-body">
          {/* 数量入力フィールド (UI編集用に値を直接表示) */}
          <input
            type="number"
            defaultValue={balance !== null ? balance.toFixed(6) : "0.0"}
            placeholder="0.0"
            className="swap-input" // 既存のCSSクラス、またはTailwindクラスに置き換え
            // onChange={(e) => console.log(e.target.value)} // あとで実装
          />
          {/* トークンセレクター (仮配置) */}
          <TokenSelector
            selected={dummyFromToken}
            onSelect={(token) => console.log('Selected From Token:', token)}
          />
        </div>
        <div className="box-footer">
          {/* USD相当額表示 (ダミー) */}
          <span>
            ≈ $
            {(balance !== null ? balance * 180 /* 仮価格 */ : 0).toFixed(2)}
          </span>
          {/* %指定ボタンなどを配置するならここ */}
        </div>
      </div>

      {/* --- トークン入れ替えボタン (UI編集用) --- */}
      <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
        <button
          style={{
            background: '#333',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
          }}
          onClick={() => console.log('Swap direction')} // あとで実装
        >
          ↓
        </button>
      </div>

      {/* --- 「受け取る」セクション (UI編集の開始点) --- */}
      <div className="swap-box">
        <div className="box-header">
          <span>To (Estimated)</span>
          {/* <span className="text-xs">Balance: 0.00 USDC</span> */}
        </div>
        <div className="box-body">
          <input
            type="number"
            placeholder="0.0"
            readOnly // 推定値を表示するため
            className="swap-input"
            // value={...} // あとでレート計算結果をバインド
          />
          {/* トークンセレクター (仮配置) - 将来的には別のトークンを選択 */}
          <TokenSelector
            selected={{symbol: "USDC", logoUrl: "/token-logos/usdc.svg"}} // 仮
            onSelect={(token) => console.log('Selected To Token:', token)}
          />
        </div>
        <div className="box-footer">
          {/* <span>≈ $0.00</span> */}
        </div>
      </div>

      {/* --- レート情報など (UI編集用プレースホルダー) --- */}
      <div style={{ margin: '1rem 0', fontSize: '0.875rem', color: '#aaa' }}>
        {/* <p>1 SOL ≈ 180 USDC (仮レート)</p> */}
        {/* <p>Price Impact: <span style={{ color: '#4caf50' }}>0.01%</span></p> */}
      </div>


      <button className="swap-button-large">Swap (UI Edit Mode)</button>
    </div>
  );
}
