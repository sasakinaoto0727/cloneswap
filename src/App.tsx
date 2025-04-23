// src/App.jsx
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// デフォルトスタイル（カスタマイズ可能）
import '@solana/wallet-adapter-react-ui/styles.css';

// コンポーネントのインポート
import Header from './components/Header';
import SwapInterface from './components/SwapInterface';
import './App.css';

function App() {
  // ネットワークはdevnet、testnet、mainnet-betaに設定可能
  const network = WalletAdapterNetwork.Devnet;
  
  // RPC エンドポイントの設定
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  // サポートするウォレットのリスト
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="app">
            <Header />
            <SwapInterface />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
