import React, { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';

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

  useEffect(() => {
    const p = getProvider();
    if (!p) return;
    setProvider(p);
    p.on('connect', () => {
      setPublicKey(p.publicKey!.toString());
    });
    p.on('disconnect', () => {
      setPublicKey('');
    });
    p.connect({ onlyIfTrusted: true }).catch(() => {});
  }, []);

  const connect = async () => {
    if (!provider) return;
    try {
      const resp = await provider.connect();
      setPublicKey(resp.publicKey.toString());
    } catch {}
  };

  const disconnect = async () => {
    await provider?.disconnect();
  };

  return (
    <div className="flex items-center space-x-4">
      {publicKey ? (
        <>
          <span className="text-sm">🔑 {publicKey}</span>
          <button onClick={disconnect} className="px-3 py-1 bg-red-600 text-white rounded">
            Disconnect
          </button>
        </>
      ) : (
        <button onClick={connect} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Connect Phantom
        </button>
      )}
    </div>
  );
}