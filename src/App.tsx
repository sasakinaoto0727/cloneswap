import React, { useState } from 'react';
import Header from './components/Header';
import SwapInterface from './components/SwapInterface';
import './index.css';

export default function App() {
  // ★変更点：ウォレットアドレスをstateとして管理
  const [walletAddress, setWalletAddress] = useState<string>('');

  // ★変更点：ウォレット接続時にstateを更新するハンドラ
  const handleConnect = (address: string) => {
    console.log('Connected wallet address:', address);
    setWalletAddress(address);
  };

  return (
    <div className="app-container">
      {/* ★変更点：Headerにハンドラを渡す */}
      <Header onConnect={handleConnect} />
      <main className="main-content">
        {/* ★変更点：SwapInterfaceにstateを渡す */}
        <SwapInterface walletAddress={walletAddress} />
      </main>
    </div>
  );
}