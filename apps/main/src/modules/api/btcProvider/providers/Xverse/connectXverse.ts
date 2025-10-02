import { IConnectBtcResponse } from '../../types';
import { getInjectedXverseBtcProvider } from './getInjectedBtcProvider';

const FIRST_WALLET = 0;

/**
 * Connect to the Xverse wallet.
 *
 * @docs https://docs.xverse.app/sats-connect/connecting-to-the-wallet/getaccounts
 *
 * @returns Standard response with the address and public key.
 */
export async function connectXverse(): Promise<IConnectBtcResponse> {
  const injectedProvider = getInjectedXverseBtcProvider();

  const response = await injectedProvider.request('getAccounts', {
    purposes: ['payment'],
    message: 'Connect Lombard APP to Xverse wallet.',
  });

  return {
    address: response.result[FIRST_WALLET].address,
    publicKey: response.result[FIRST_WALLET].publicKey,
  };
}
