import BigNumber from 'bignumber.js';
import { IUnstake } from 'modules/api';
import { useConnection } from 'modules/auth';
import { ACTION_CACHE } from 'modules/common/const';
import { useGetUnstakeHistoryQuery } from 'modules/dashboard/actions/getUnstakeHistory';
import { useMemo } from 'react';
import { IUnstakeTableRow } from './types';

interface IUseTableRows {
  rows: IUnstakeTableRow[];
  isLoading: boolean;
}

export function useUnstakeTableRows(): IUseTableRows {
  const { isConnected } = useConnection();

  const { data: unstakes = [], isLoading } = useGetUnstakeHistoryQuery(
    undefined,
    { refetchOnMountOrArgChange: ACTION_CACHE, skip: !isConnected },
  );

  return {
    rows: useMemo(() => unstakes.map(mapRowData), [unstakes]),
    isLoading,
  };
}

function mapRowData(data: IUnstake): IUnstakeTableRow & { id: string } {
  return {
    id: data.txHash,
    txId: data.txHash,
    date: data.date,
    fromChain: data.chainId,
    amount: new BigNumber(data.amount),
    btcAddress: data.btcAddress,
    isCompleted: !!data.payoutTxid,
    payoutTxid: data.payoutTxid,
  };
}
