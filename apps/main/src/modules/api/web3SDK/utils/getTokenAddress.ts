import { TChainId } from 'modules/api/chainIDs';
import { TLstToken } from 'modules/api/tokens';
import { Address } from 'modules/common/types';
import { getNetworkConfig } from './getNetworkConfig';

export function getTokenAddress(chainId: TChainId, token: TLstToken): Address {
  const config = getNetworkConfig(chainId);
  const address = config[token];
  return address;
}
