import { TChainId } from '../chainIDs';
import { WriteProvider } from '../web3Provider';
import { signMessage } from '../web3SDK';

/**
 * Signs the destination address for the LBTC in active chain
 * in the current account.
 *
 * @param provider The provider to use for signing.
 * @param chainId The chain ID of the destination chain.
 *
 * @returns The signature of the message.
 */
export async function signLbtcDestionationAddr(
  provider: WriteProvider,
  chainId: TChainId,
): Promise<string> {
  const message = `destination chain id is ${chainId}`;
  return signMessage(provider, message);
}
