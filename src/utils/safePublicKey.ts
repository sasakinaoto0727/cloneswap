import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

/**
 * 入力文字列を Base58 または hex から安全に PublicKey に変換。
 * @returns 有効な PublicKey、無効な場合は null
 */
export function safePublicKey(input: string): PublicKey | null {
  try {
    // hex 文字列（すべて 0–9 a–f）ならバイトに変換して Base58 化
    if (/^[0-9a-fA-F]+$/.test(input)) {
      const bytes = Buffer.from(input, 'hex');
      return new PublicKey(bs58.encode(bytes));
    }
    // それ以外は Base58 文字列として試行
    return new PublicKey(input);
  } catch {
    return null;
  }
}
