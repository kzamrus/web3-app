import { INotarizeTx, TChainId } from 'modules/api';
import { useConnection } from 'modules/auth';
import { useGetBridgeDataQuery } from 'modules/bridge/actions/getBridgeData';
import { useNotarizeTxQuery } from 'modules/bridge/actions/notarizeTx';
import { DepositToBridgeData } from 'modules/bridge/types';
import { useGetTxReceiptQuery } from 'modules/common/actions/getTxReceipt';
import { ACTION_CACHE } from 'modules/common/const';
import { TransactionReceiptAPI } from 'web3-types';
import { useMemo } from 'react';
interface IUseBridgeFinishArgs {
  chainIdParam: number;
  txHashParam: string;
}

interface IUseBridgeFinish {
  noratizedTx: INotarizeTx | undefined;
  txReceipt: TransactionReceiptAPI | undefined | null;
  isNoratizedTxLoading: boolean;
  isTxReceiptLoading: boolean;
  isBridgeDataLoading: boolean;
  bridgeData: DepositToBridgeData | undefined;
  txhashNotExists: boolean;
}

export function useBridgeFinish({
  chainIdParam,
  txHashParam,
}: IUseBridgeFinishArgs): IUseBridgeFinish {
  const { isConnected } = useConnection();

  const mustSkip = !chainIdParam || !txHashParam;

  const { data: noratizedTx, isLoading: isNoratizedTxLoading } =
    useNotarizeTxQuery(
      { txHash: txHashParam, chainId: chainIdParam as TChainId },
      {
        refetchOnMountOrArgChange: ACTION_CACHE,
        skip: !isConnected || mustSkip,
      },
    );

  const { data: txReceipt, isLoading: isTxReceiptLoading } =
    useGetTxReceiptQuery(
      { txHash: txHashParam, chainId: chainIdParam as TChainId },
      {
        refetchOnMountOrArgChange: ACTION_CACHE,
        skip: !isConnected || mustSkip,
      },
    );

  const { data: bridgeData, isLoading: isBridgeDataLoading } =
    useGetBridgeDataQuery(
      { txReceipt: txReceipt!, chainId: chainIdParam as TChainId },
      { refetchOnMountOrArgChange: 10, skip: !txReceipt || mustSkip },
    );

  const txhashNotExists = useMemo(() => {
    return !txReceipt;
  }, [txReceipt]);

  return {
    noratizedTx,
    txReceipt,
    bridgeData,
    isNoratizedTxLoading,
    isTxReceiptLoading,
    isBridgeDataLoading,
    txhashNotExists,
  };
}
