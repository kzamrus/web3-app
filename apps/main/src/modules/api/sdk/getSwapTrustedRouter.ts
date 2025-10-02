import axios from 'axios';
import { TChainId } from '../chainIDs';
import { Address } from '@ankr.com/provider';
import { getApiConfig } from '../apiConfig';

const { _1inchApiUrl } = getApiConfig();

export interface ISwapTrustedRouterResponse {
  address: Address;
}

export const getSwapTrustedRouter = async (
  chain: TChainId,
): Promise<ISwapTrustedRouterResponse> => {
  const url = `${_1inchApiUrl}/swap/v6.0/${chain}/approve/spender`;

  try {
    const { data } = await axios.get<ISwapTrustedRouterResponse>(url);
    return data;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch trusted router from 1inch');
  }
};
