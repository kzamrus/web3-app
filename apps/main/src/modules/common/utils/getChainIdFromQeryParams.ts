import { OChainId, TChainId } from 'modules/api';

export function getChainIdFromQeryParams(
  network?: string,
): TChainId | undefined {
  if (!network) {
    return undefined;
  }
  const chainId = +network as TChainId;
  const isValidChainId = Object.values(OChainId).includes(chainId);

  return isValidChainId ? chainId : undefined;
}
