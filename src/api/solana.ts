import { Connection, PublicKey } from '@solana/web3.js';

/**
 * Solana RPC の getParsedTokenAccountsByOwner を用い、
 * UI 単位（uiAmount）で SPL トークン残高を取得するユーティリティ。
 */
export async function fetchTokenBalance(
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey
): Promise<number> {
  const resp = await connection.getParsedTokenAccountsByOwner(owner, { mint });
  if (resp.value.length === 0) return 0;
  // 最初のアカウントの parsed.info.tokenAmount.uiAmount を返す
  const parsedInfo = (resp.value[0].account.data as any).parsed.info
    .tokenAmount;
  return parsedInfo.uiAmount as number;
}
