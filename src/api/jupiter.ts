// src/api/jupiter.ts

// 既存のfetchTokenPrices関数はそのままでOK
/**
 * Jupiter Price API V2 でトークン価格（USD）を取得
 * @param mints トークンの Mint アドレス文字列配列
 * @returns {Promise<Record<string, number>>} { mint: price }
 */
export async function fetchTokenPrices(
  mints: string[]
): Promise<Record<string, number>> {
const ids = mints.join(',');
const res = await fetch(`https://price.jup.ag/v4/price?ids=${ids}`); // v4 APIを推奨
const json = await res.json();
const prices: Record<string, number> = {};
if (json.data) {
  for (const id in json.data) {
    prices[id] = json.data[id].price;
  }
}
return prices;
}


// ★★★ ここから下を追記 ★★★

// Jupiter APIから返されるQuoteレスポンスの型を定義
export interface JupiterQuoteResponse {
inputMint: string;
inAmount: string;
outputMint: string;
outAmount: string;
otherAmountThreshold: string;
swapMode: string;
slippageBps: number;
platformFee: {
  amount: string;
  feeBps: number;
};
priceImpactPct: string;
routePlan: any[]; // 簡略化のためany
contextSlot: number;
timeTaken: number;
}


/**
* Jupiter Quote API でスワップのレートと推定受取量を取得
* @param inputMint - 支払うトークンのMintアドレス
* @param outputMint - 受け取るトークンのMintアドレス
* @param amount - 支払うトークンの量 (最小単位、例: SOLならlamports)
* @param slippageBps - スリッページ許容度 (BPS, 例: 50 = 0.5%)
* @returns {Promise<JupiterQuoteResponse | null>}
*/
export async function fetchJupiterQuote(
inputMint: string,
outputMint: string,
amount: number,
slippageBps: number = 50 // デフォルトは0.5%
): Promise<JupiterQuoteResponse | null> {
if (amount === 0) {
  return null;
}
try {
  const response = await fetch(
    `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
  );
  if (!response.ok) {
    console.error('Jupiter Quote API error:', response.status, response.statusText);
    return null;
  }
  const data: JupiterQuoteResponse = await response.json();
  return data;
} catch (error) {
  console.error('Failed to fetch Jupiter quote:', error);
  return null;
}
}