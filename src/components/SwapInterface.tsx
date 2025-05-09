
import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { fetchTokenBalance } from '../api/solana';
import { safePublicKey } from '../utils/safePublicKey';
import TokenSelector, { Token } from './TokenSelector';
import './SwapInterface.css';

const RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';

export default function SwapInterface({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const [balance, setBalance] = useState<number | null>(null);
  const connection = new Connection(RPC_ENDPOINT);

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

  if (balance === null) {
    return <div className="swap-card-large">アドレスが無効か残高取得中...</div>;
  }

  return (
    <div className="swap-card-large">
      <h2 className="swap-title">Swap</h2>
      <div className="swap-box">
        <div className="box-header">From (SOL)</div>
        <div className="box-body">
          <span className="swap-input">{balance.toFixed(6)}</span>
        </div>
        <div className="box-footer">
          <span>≈ ${(balance * 180 /* 仮価格 */).toFixed(2)}</span>
        </div>
      </div>
      <button className="swap-button-large">Swap</button>
    </div>
  );
}
