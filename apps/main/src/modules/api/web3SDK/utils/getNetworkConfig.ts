import { TChainId } from 'modules/api/chainIDs';
import { NetworkConfig, getEvmConfig } from '../evmConfig';

export function getNetworkConfig(chainId: TChainId): NetworkConfig {
  const networkConfig = getEvmConfig()[chainId];

  if (!networkConfig) {
    throw new Error(`NetworkConfig for chain ${chainId} is not defined`);
  }

  return networkConfig;
}
