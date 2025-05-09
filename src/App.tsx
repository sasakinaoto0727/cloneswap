import React from 'react';
import Header from './components/Header';
import ConnectPhantom from './components/ConnectPhantom';
import SwapInterface from './components/SwapInterface';
import './index.css';

export default function App() {
  return (
    <div className="app-container">
      {/* ヘッダー内にタイトルとウォレットボタン */}
      <Header />
      <main className="main-content">
        <SwapInterface walletAddress="HJMMmqY2P56grPBXVHeS8RksDzyd3CWiRjMPTYih6cxA" />
      </main>
    </div>
  );
}
