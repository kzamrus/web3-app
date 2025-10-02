import { toSatoshi } from 'modules/api/utils/convertSatoshi';
import { TNetworkMode } from '../../types';
import { TTomoBtcNetwork, getTomoBtcProvider } from './getTomoBtcProvider';

/**
 * Send Tomo BTC to the specified address.
 *
 * @param to - Recipient address.
 * @param amount - Amount to send in BTC.
 *
 * @returns Transaction hash.
 */
export async function sendTxTomo(
  to: string,
  amount: string,
  network?: TNetworkMode,
): Promise<string> {
  const provider = getTomoBtcProvider();

  if (!provider) {
    throw new Error('Tomo BTC provider is not found');
  }

  const networkMode: TTomoBtcNetwork =
    network === 'testnet' ? 'signet' : 'mainnet';

  await provider.switchNetwork(networkMode);

  return provider.sendBitcoin(to, toSatoshi(amount));
}
