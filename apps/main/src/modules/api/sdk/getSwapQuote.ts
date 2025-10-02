import axios from 'axios';
import { TChainId } from '../chainIDs';
import { Address } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { getApiConfig } from '../apiConfig';

const { _1inchApiUrl } = getApiConfig();

export interface ISwapQuoteResponse {
  dstAmount: BigNumber;
  gas: BigNumber; // GWEI
}

export interface ISwapQuoteParams {
  src: Address;
  dst: Address;
  amount: BigNumber;
}

export const getSwapQuote = async (
  chain: TChainId,
  params: ISwapQuoteParams,
): Promise<ISwapQuoteResponse> => {
  const url = `${_1inchApiUrl}/swap/v6.0/${chain}/quote`;

  const config = {
    params: { ...params, amount: params.amount.toString(), includeGas: 'true' },
  };

  try {
    const { data } = await axios.get<ISwapQuoteResponse>(url, config);
    return {
      dstAmount: new BigNumber(data.dstAmount),
      gas: new BigNumber(data.gas),
    };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch quote from 1inch');
  }
};
