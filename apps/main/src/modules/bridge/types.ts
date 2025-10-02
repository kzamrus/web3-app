import { Address } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { OChainId, TChainId } from 'modules/api';

export type BridgeChain = keyof Pick<
  typeof OChainId,
  | 'okxXLayer'
  | 'okxXLayerTestnet'
  | 'mantle'
  | 'scroll'
  | 'zircuit'
  | 'holesky'
  | 'ethereum'
  | 'mantleSepolia'
  | 'lineaSepolia'
  | 'linea'
>;

export interface SupportedChain {
  abbr: BridgeChain;
  chainId: number;
  name: string;
}

export type Millisecond = number;

export type DepositToBridgeData = {
  chainId: TChainId;
  fromToken: Address;
  toToken: Address;
  totalAmount: BigNumber;
};

export type TxHash = `0x${string}`;
