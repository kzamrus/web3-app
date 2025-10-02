import axios from 'axios';
import { TChainId } from '../chainIDs';
import { Address } from '@ankr.com/provider';
import { getApiConfig } from '../apiConfig';

const { _1inchApiUrl } = getApiConfig();

export type BalanceAndAllowance = { balance: string; allowance: string };

type Wallets = Record<Address, BalanceAndAllowance>;

export interface ISwapTokenBalanceResponse {
  decimals: number;
  symbol: string;
  tags: string[];
  address: Address;
  name: string;
  logoURI: string;
  eip2612: boolean;
  isFoT: boolean;
  isCustom: boolean;
  wallets: Wallets;
  type: string;
  tracked: boolean;
}

export const getSwapTokenBalance = async (
  chain: TChainId,
  wallet: Address,
  spender: Address,
): Promise<ISwapTokenBalanceResponse[]> => {
  const url = `${_1inchApiUrl}/balance/v1.2/${chain}/aggregatedBalancesAndAllowances/${spender}`;

  const config = {
    params: { wallets: wallet, filterEmpty: 'true' },
  };

  try {
    const { data } = await axios.get<ISwapTokenBalanceResponse[]>(url, config);

    return data;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch balance from 1inch');
  }
};
