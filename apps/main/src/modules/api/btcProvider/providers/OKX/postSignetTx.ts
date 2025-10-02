import axios from 'axios';

/**
 * @docs https://mempool.space/signet/docs/api/rest#post-transaction
 * @param txHex - transaction hex
 * @returns The txid will be returned on success
 */
export async function postSignetTx(txHex: string): Promise<string> {
  try {
    const { data } = await axios.post<string>(
      'https://mempool.space/signet/api/tx',
      txHex,
    );

    return data;
  } catch (error) {
    throw new Error(`Failed to post Signet TX: ${error}`);
  }
}
