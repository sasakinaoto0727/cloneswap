// global.d.ts
interface PhantomProvider {
    isPhantom: boolean;
    publicKey: import('@solana/web3.js').PublicKey | null;
    isConnected: boolean;
    connect: (opts?: { onlyIfTrusted: boolean }) => Promise<{ publicKey: import('@solana/web3.js').PublicKey }>;
    disconnect: () => Promise<void>;
    on: (event: 'connect' | 'disconnect', handler: () => void) => void;
  }
  interface Window {
    phantom?: { solana?: PhantomProvider };
    solana?: PhantomProvider;
  }
  