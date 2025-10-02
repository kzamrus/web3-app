import axios from 'axios';
import { TChainId } from '../chainIDs';
import { Address } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { getApiConfig } from '../apiConfig';

const { _1inchApiUrl } = getApiConfig();

export interface Tx {
  from: string;
  to: string;
  data: string;
  value: BigNumber;
  gas: number;
  gasPrice: BigNumber;
}

export interface Protocol {
  name: string;
  part: number;
  fromTokenAddress: string;
  toTokenAddress: string;
}

export interface ISwapCalldataResponse {
  dstAmount: BigNumber;
  tx: Tx;
  protocols: Protocol[][][];
}

export interface ISwapCalldataParams {
  src: Address;
  dst: Address;
  amount: BigNumber;
  from: Address;
  origin: Address;
  slippage: number; // 1-50
}

export const getSwapCalldata = async (
  chain: TChainId,
  params: ISwapCalldataParams,
): Promise<ISwapCalldataResponse> => {
  const url = `${_1inchApiUrl}/swap/v6.0/${chain}/swap`;

  const config = {
    params: {
      ...params,
      amount: params.amount.toString(),
      includeProtocols: 'true',
      includeGas: 'true',
    },
  };

  try {
    const { data } = await axios.get<ISwapCalldataResponse>(url, config);
    return {
      ...data,
      dstAmount: new BigNumber(data.dstAmount),
      tx: {
        ...data.tx,
        value: new BigNumber(data.tx.value),
        gasPrice: new BigNumber(data.tx.gasPrice),
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch calldata from 1inch');
  }
};
