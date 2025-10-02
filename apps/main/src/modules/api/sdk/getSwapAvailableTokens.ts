import axios from 'axios';
import { getApiConfig } from '../apiConfig';
import { TChainId } from '../chainIDs';
import { Address } from '@ankr.com/provider';

const { _1inchApiUrl } = getApiConfig();

export interface TToken {
  address: Address;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string | null;
  eip2612: boolean;
  tags: string[];
}

export type TTokens = Record<Address, TToken>;

export interface SwapAvailableTokensData {
  tokens: TTokens;
}

export const getSwapAvailableTokens = async (chain: TChainId) => {
  const url = `${_1inchApiUrl}/swap/v6.0/${chain}/tokens`;

  try {
    const { data } = await axios.get<SwapAvailableTokensData>(url);
    return data;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch available tokens from 1inch');
  }
};
