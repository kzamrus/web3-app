import { IS_PROD } from 'modules/common/const';
import { BtcProvider } from './BtcProvider';
import { OBtcWalletId, TBtcWalletId, TNetworkMode } from './types';

const networkMode: TNetworkMode = IS_PROD ? 'mainnet' : 'testnet';

/**
 * This is the main function that returns the instance of the BtcProvider.
 *
 * @param providerId - The provider ID. This is optional and defaults to OKX.
 *
 * @returns The instance of the BtcProvider.
 */
export async function getBtcProvider(
  providerId: TBtcWalletId = OBtcWalletId.OKX,
): Promise<BtcProvider> {
  const provider = BtcProvider.getInstance({ networkMode });

  if (!provider.isConnected) {
    await provider.connect(providerId);
  }

  return provider;
}
