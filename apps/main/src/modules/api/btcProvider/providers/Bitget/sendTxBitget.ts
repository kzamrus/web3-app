import { toSatoshi } from 'modules/api/utils/convertSatoshi';
import { getBitgetBtcProviderStrict } from './getBitgetBtcProvider';

/**
 * @docs https://web3.bitget.com/en/docs/provider-api/btc.html#sendBitcoin
 *
 * @param to - The address to send the transaction to.
 * @param amount - The amount to send. In BTC.
 *
 * @returns The transaction ID.
 *
 */
export async function sendTxBitget(
  to: string,
  amount: string,
): Promise<string> {
  const provider = getBitgetBtcProviderStrict();

  const txid = await provider.sendBitcoin(to, toSatoshi(amount));

  return txid;
}
