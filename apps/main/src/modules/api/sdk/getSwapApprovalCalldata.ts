import axios from 'axios';
import { TChainId } from '../chainIDs';
import { Address } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { getApiConfig } from '../apiConfig';

const { _1inchApiUrl } = getApiConfig();

export interface ISwapApprovalCalldataResponse {
  data: string;
  gasPrice: BigNumber;
  to: string;
  value: string;
}

export interface ISwapApprovalCalldataParams {
  tokenAddress: Address;
  amount: Address;
}

export const getSwapApprovalCalldata = async (
  chain: TChainId,
  params: ISwapApprovalCalldataParams,
): Promise<ISwapApprovalCalldataResponse> => {
  const url = `${_1inchApiUrl}/swap/v6.0/${chain}/approve/transaction`;

  const config = {
    params: {
      ...params,
      amount: params.amount.toString(),
    },
  };

  try {
    const { data } = await axios.get<ISwapApprovalCalldataResponse>(
      url,
      config,
    );
    return {
      ...data,
      gasPrice: new BigNumber(data.gasPrice),
    };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch approval calldata from 1inch');
  }
};
