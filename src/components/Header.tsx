import React from 'react';
import ConnectPhantom from './ConnectPhantom';

// Propsの型定義にonConnectを追加
type Props = {
  onConnect: (address: string) => void;
};

export default function Header({ onConnect }: Props) {
  return (
    <header className="header">
      {/* 左上に大きなタイトル */}
      <h1 className="app-title">cloneswap</h1>
      {/* 右上に丸いウォレット接続ボタン */}
      <div className="wallet-button-wrapper">
        {/* ★変更点: onConnectをConnectPhantomに渡す */}
        <ConnectPhantom onConnect={onConnect} />
      </div>
    </header>
  );
}