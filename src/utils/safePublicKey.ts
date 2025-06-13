// src/utils/safePublicKey.ts
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

/**
 * 入力文字列を Base58 または hex から安全に PublicKey に変換。
 * 無効な場合は null を返します。
 */
export function safePublicKey(input: string): PublicKey | null {
  console.log('[safePublicKey] input:', input);
  try {
    // hex 文字列判定（0–9, a–f のみ）
    if (/^[0-9a-fA-F]+$/.test(input)) {
      const bytes = Buffer.from(input, 'hex');
      const encoded = bs58.encode(bytes);
      const key = new PublicKey(encoded);
      console.log('[safePublicKey] interpreted as hex →', key.toBase58());
      return key;
    }
    // Base58 文字列として試行
    const key = new PublicKey(input);
    console.log('[safePublicKey] interpreted as Base58 →', key.toBase58());
    return key;
  } catch (err) {
    console.error('[safePublicKey] invalid address:', input, err);
    return null;
  }
}
