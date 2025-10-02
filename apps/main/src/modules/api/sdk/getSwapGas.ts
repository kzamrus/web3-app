import axios from 'axios';
import { TChainId } from '../chainIDs';
import BigNumber from 'bignumber.js';
import { getApiConfig } from '../apiConfig';

const { _1inchApiUrl } = getApiConfig();

export type Gas = {
  maxPriorityFeePerGas: BigNumber; // percent
  maxFeePerGas: BigNumber;
};

export interface ISwapGasResponse {
  baseFee: BigNumber;
  low: Gas;
  medium: Gas;
  high: Gas;
  instant: Gas;
}

export const getSwapGas = async (
  chain: TChainId,
): Promise<ISwapGasResponse> => {
  const url = `${_1inchApiUrl}/gas-price/v1.5/${chain}`;

  try {
    const { data } = await axios.get<ISwapGasResponse>(url);
    return {
      baseFee: new BigNumber(data.baseFee),
      low: {
        maxFeePerGas: new BigNumber(data.low.maxFeePerGas),
        maxPriorityFeePerGas: new BigNumber(data.low.maxPriorityFeePerGas),
      },
      medium: {
        maxFeePerGas: new BigNumber(data.medium.maxFeePerGas),
        maxPriorityFeePerGas: new BigNumber(data.medium.maxPriorityFeePerGas),
      },
      high: {
        maxFeePerGas: new BigNumber(data.high.maxFeePerGas),
        maxPriorityFeePerGas: new BigNumber(data.high.maxPriorityFeePerGas),
      },
      instant: {
        maxFeePerGas: new BigNumber(data.instant.maxFeePerGas),
        maxPriorityFeePerGas: new BigNumber(data.instant.maxPriorityFeePerGas),
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch gas from 1inch');
  }
};
