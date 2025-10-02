import BigNumber from 'bignumber.js';
import { TChainId } from 'modules/api';

export const OStakeRow = {
  date: 'date',
  txHash: 'txHash',
  amountSent: 'amountSent',
  amountReceive: 'amountReceive',
  chainId: 'chainId',
  status: 'status',
} as const;

export interface IStakeRow {
  id: string;
  [OStakeRow.date]: string;
  [OStakeRow.txHash]: string;
  [OStakeRow.amountSent]: BigNumber;
  [OStakeRow.amountReceive]: BigNumber;
  [OStakeRow.chainId]: TChainId;
  [OStakeRow.status]: string;
}
