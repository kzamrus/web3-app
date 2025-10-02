import { TChainId } from '../chainIDs';
import { ReadProvider } from './ReadProvider';
import { getRpcUrl } from './utils/getRpcUrl';

const providers: Record<number, ReadProvider> = {};

export async function getReadProvider(
  chainId: TChainId,
): Promise<ReadProvider> {
  if (providers[chainId]) {
    return providers[chainId];
  }

  const url = getRpcUrl(chainId);
  const provider = new ReadProvider(url, chainId);
  await provider.connect();
  providers[chainId] = provider;

  return provider;
}
