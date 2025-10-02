/**
 * Get the current fee rate in satoshis per byte.
 *
 * @note based on https://mempool.space/signet/docs/api/rest#get-recommended-fees
 */
export async function getFeeRate(): Promise<number> {
  const url = `https://mempool.space/signet/api/v1/fees/recommended`;
  const response = await fetch(url);
  const data = await response.json();
  return data.fastestFee;
}
