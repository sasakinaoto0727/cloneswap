/**
 * Jupiter Price API V2 でトークン価格（USD）を取得
 * @param mints トークンの Mint アドレス文字列配列
 * @returns {Promise<Record<string, number>>} { mint: price }
 */
export async function fetchTokenPrices(
    mints: string[]
  ): Promise<Record<string, number>> {
    const ids = mints.join(',');
    const res = await fetch(`https://lite-api.jup.ag/price/v2?ids=${ids}`);
    const json = await res.json();
    const prices: Record<string, number> = {};
    for (const entry of json.data) {
      prices[entry.id] = entry.price;
    }
    return prices;
  }
  