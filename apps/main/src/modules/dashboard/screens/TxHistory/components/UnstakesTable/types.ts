import BigNumber from 'bignumber.js';
import { TChainId } from 'modules/api';

export const OUnstakeCols = {
  date: 'date',
  network: 'network',
  amountSent: 'amountSent',
  btcAddress: 'btcAddress',
  amountReceive: 'amountReceive',
  status: 'status',
} as const;

export interface IUnstakeTableRow {
  date: Date;
  txId: string;
  fromChain: TChainId;
  amount: BigNumber;
  btcAddress: string;
  isCompleted: boolean;
  payoutTxid?: string;
}
