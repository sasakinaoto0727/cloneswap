import React, { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { maskAddress } from '../utils/mask';

// Phantom Provider 型を global に追加
declare global {
  interface PhantomProvider {
    isPhantom: boolean;
    publicKey: PublicKey | null;
    isConnected: boolean;
    connect: (opts?: { onlyIfTrusted: boolean }) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    on: (event: 'connect' | 'disconnect', handler: () => void) => void;
  }
  interface Window {
    phantom?: { solana?: PhantomProvider };
    solana?: PhantomProvider;
  }
}

/**  
 * window 上から Phantom Provider を取得します。  
 * 未インストール時は公式サイトを開きます。  
 */  
function getProvider(): PhantomProvider | undefined {  
  const anyWindow = window as any;  
  const provider = anyWindow.phantom?.solana || anyWindow.solana;  
  if (provider?.isPhantom) return provider;  
  window.open('https://phantom.app/', '_blank');  
  return undefined;  
}

export default function ConnectPhantom() {
  const [provider, setProvider] = useState<PhantomProvider>();
  const [publicKey, setPublicKey] = useState<string>('');

  // 初回マウント時にプロバイダー検出とイベント登録
  useEffect(() => {
    const p = getProvider();
    if (!p) return;
    setProvider(p);

    // 接続イベント
    p.on('connect', () => {
      setPublicKey(p.publicKey!.toString());
    });
    // 切断イベント
    p.on('disconnect', () => {
      setPublicKey('');
    });

    // 既に許可済みなら自動接続
    p.connect({ onlyIfTrusted: true }).catch(() => {});
  }, []);

  // Connect ボタンハンドラ
  const connect = async () => {
    if (!provider) return;
    try {
      const resp = await provider.connect();
      setPublicKey(resp.publicKey.toString());
    } catch (err) {
      console.error('Phantom connect error', err);
    }
  };

  // Disconnect ボタンハンドラ
  const disconnect = async () => {
    await provider?.disconnect();
  };

  return (
    <div className="flex items-center space-x-4">
      {publicKey ? (
        <>
          {/* マスク表示済みのアドレス */}
          <span className="text-sm">
            🔑 {maskAddress(publicKey)}
          </span>
          <button
            onClick={disconnect}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connect}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Connect Phantom
        </button>
      )}
    </div>
  );
}
