// src/components/SwapInterface.jsx
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import './SwapInterface.css';
import TokenSelector from './TokenSelector';

function SwapInterface() {
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellToken, setSellToken] = useState(null);
  const [buyToken, setBuyToken] = useState(null);
  
  // ウォレットの状態を取得
  const { publicKey, sendTransaction } = useWallet();
  
  const handleSwap = async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    
    // 実際のトランザクション構築とウォレットへの送信処理
    // ここには実際のスワップロジックを実装
    console.log('スワップを実行', {
      publicKey: publicKey.toString(),
      sellAmount,
      sellToken,
      buyAmount,
      buyToken
    });
    
    // 実際のトランザクション処理ロジックはここに追加
  };
  
  // 保有資産の25%、50%、75%、100%を設定する関数
  const setPercentageAmount = (percentage) => {
    // 実際のウォレット残高から計算
    // この例ではモックデータを使用
    const mockBalance = 100; // 実際にはウォレットから取得
    const amount = mockBalance * (percentage / 100);
    
    if (percentage === 100) {
      setSellAmount('最大');
    } else {
      setSellAmount(amount.toString());
    }
  };
  
  return (
    <div className="swap-container">
      <div className="swap-card">
        <div className="swap-header">
          <h2>トークンスワップ</h2>
        </div>
        
        {/* 売却セクション */}
        <div className="swap-section">
          <div className="swap-section-header">
            <span className="swap-label">売却</span>
            <span className="balance-info">
              残高: {publicKey ? '計算中...' : '未接続'}
            </span>
          </div>
          
          <div className="input-container">
            <input
              type="text"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              placeholder="0.0"
              className="token-amount-input"
            />
            <TokenSelector 
              selectedToken={sellToken}
              onTokenSelect={setSellToken}
            />
          </div>
          
          {/* パーセンテージセレクター */}
          <div className="percentage-selector">
            <button onClick={() => setPercentageAmount(25)}>25%</button>
            <button onClick={() => setPercentageAmount(50)}>50%</button>
            <button onClick={() => setPercentageAmount(75)}>75%</button>
            <button onClick={() => setPercentageAmount(100)}>最大</button>
          </div>
        </div>
        
        {/* 矢印アイコン */}
        <div className="direction-arrow">
          <span>↓</span>
        </div>
        
        {/* 購入セクション */}
        <div className="swap-section">
          <div className="swap-section-header">
            <span className="swap-label">購入</span>
          </div>
          
          <div className="input-container">
            <input
              type="text"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              placeholder="0.0"
              className="token-amount-input"
            />
            <TokenSelector 
              selectedToken={buyToken}
              onTokenSelect={setBuyToken}
            />
          </div>
        </div>
        
        {/* スワップボタン */}
        <button 
          className="swap-button"
          onClick={handleSwap}
          disabled={!publicKey}
        >
          {publicKey ? 'スワップ' : 'ウォレットを接続してください'}
        </button>
      </div>
    </div>
  );
}

export default SwapInterface;
