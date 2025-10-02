import { IConnectBtcResponse, TNetworkMode } from '../../types';
import { getInjectedOkxBtcProvider } from './getInjectedBtcProvider';

/**
 * Connect to the OKX wallet.
 *
 * @param networkMode - The network mode.
 *
 * @returns Standard response with the address and public key.
 */
export async function connectOKX(
  networkMode: TNetworkMode,
): Promise<IConnectBtcResponse> {
  const injectedProvider = getInjectedOkxBtcProvider(networkMode);
  const response = await injectedProvider.connect();

  return response;
}
