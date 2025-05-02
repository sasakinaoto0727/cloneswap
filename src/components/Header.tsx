import React from 'react';
import ConnectPhantom from './ConnectPhantom';

export default function Header() {
  return (
    <header className="header">
      {/* 左上に大きなタイトル */}
      <h1 className="app-title">cloneswap</h1>
      {/* 右上に丸いウォレット接続ボタン */}
      <div className="wallet-button-wrapper">
        <ConnectPhantom />
      </div>
    </header>
  );
}
