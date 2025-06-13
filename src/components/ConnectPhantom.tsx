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
  // window.open('https://phantom.app/', '_blank'); // 未インストール時の自動オープンは一旦無効化
  return undefined;
}

// Propsの型定義にonConnectを追加
type Props = {
  onConnect: (address: string) => void;
};

export default function ConnectPhantom({ onConnect }: Props) {
  const [provider, setProvider] = useState<PhantomProvider>();
  const [publicKey, setPublicKey] = useState<string>('');

  // 初回マウント時にプロバイダー検出とイベント登録
  useEffect(() => {
    const p = getProvider();
    if (!p) return;
    setProvider(p);

    // 接続イベント
    p.on('connect', () => {
      if (p.publicKey) {
        const address = p.publicKey.toString();
        setPublicKey(address);
        onConnect(address); // ★変更点：接続時にアドレスを親に通知
      }
    });
    // 切断イベント
    p.on('disconnect', () => {
      setPublicKey('');
      onConnect(''); // ★変更点：切断時に空文字を親に通知
    });

    // 既に許可済みなら自動接続
    p.connect({ onlyIfTrusted: true }).catch(() => {
      /* no-op */
    });
  }, [onConnect]); // onConnectを依存配列に追加

  // Connect ボタンハンドラ
  const connect = async () => {
    if (!provider) {
      window.open('https://phantom.app/', '_blank'); // プロバイダがない場合はインストールを促す
      return;
    }
    try {
      const resp = await provider.connect();
      const address = resp.publicKey.toString();
      setPublicKey(address);
      onConnect(address); // ★変更点：接続時にアドレスを親に通知
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
          <span className="text-sm font-mono bg-gray-700 px-3 py-2 rounded-md">
            {maskAddress(publicKey)}
          </span>
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connect}
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Connect Phantom
        </button>
      )}
    </div>
  );
}