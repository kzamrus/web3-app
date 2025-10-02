import { IUtxo } from '../../common/types';

/**
 * Get UTXOs by address.
 *
 * @note can be used only for Signet.
 * @docs https://mempool.space/signet/api/tx/0c5fd25fef63215e25197b53211ae5a6788e1f9b5b1a0519eda5b3c83efff41b
 * @docs https://mempool.space/signet/api/address/tb1pxndecfuuema3u8jjrdd24p954rhkp2zre0ud5mlna2yur2z98p0sfved7t/utxo
 *
 * @param address Address to get UTXOs.
 * @returns array of UTXOs
 */
export async function getUtxosByAddress(address: string): Promise<IUtxo[]> {
  const url = `https://mempool.space/signet/api/address/${address}/utxo`;

  try {
    const response = await fetch(url);

    return response.json();
  } catch (error) {
    throw new Error(`Failed to get UTXOs by address: ${error}`);
  }
}
