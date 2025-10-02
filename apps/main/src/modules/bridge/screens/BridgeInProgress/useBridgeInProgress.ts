import { INotarizeTx, TChainId } from 'modules/api';
import { useConnection } from 'modules/auth';
import { useGetBridgeDataQuery } from 'modules/bridge/actions/getBridgeData';
import { useNotarizeTxQuery } from 'modules/bridge/actions/notarizeTx';
import { bridgeRoutesConfig } from 'modules/bridge/bridgeRoutesConfig';
import { ACTION_POLLING_SHORT } from 'modules/bridge/const';
import { changeProgress, reset } from 'modules/bridge/store/bridgeSlice';
import { DepositToBridgeData } from 'modules/bridge/types';
import { useGetTxReceiptQuery } from 'modules/common/actions/getTxReceipt';
import { ACTION_CACHE } from 'modules/common/const';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TransactionReceiptAPI } from 'web3-types';

interface IUseBridgeInProgressArgs {}

interface IUseBridgeInProgress {
  noratizedTx: INotarizeTx | undefined;
  txReceipt: TransactionReceiptAPI | undefined | null;
  isNoratizedTxLoading: boolean;
  isTxReceiptLoading: boolean;
  depositDone: boolean;
  isBridgeDataLoading: boolean;
  bridgeData: DepositToBridgeData | undefined;
}

export function useBridgeInProgress({}: IUseBridgeInProgressArgs): IUseBridgeInProgress {
  const { chainId, isConnected } = useConnection();
  const { txHash = '', chainId: fromChainId } =
    bridgeRoutesConfig.bridgeProgress.useParams();
  const dispatch = useDispatch();

  const { data: noratizedTx, isLoading: isNoratizedTxLoading } =
    useNotarizeTxQuery(
      { txHash, chainId: Number(fromChainId) as TChainId },
      {
        pollingInterval: ACTION_POLLING_SHORT,
        skipPollingIfUnfocused: true,
        skip: !isConnected,
      },
    );

  const { data: txReceipt, isLoading: isTxReceiptLoading } =
    useGetTxReceiptQuery(
      { txHash, chainId: Number(fromChainId) as TChainId },
      {
        pollingInterval: ACTION_POLLING_SHORT,
        skipPollingIfUnfocused: true,
        skip: !isConnected,
      },
    );

  const { data: bridgeData, isLoading: isBridgeDataLoading } =
    useGetBridgeDataQuery(
      { txReceipt: txReceipt!, chainId: Number(fromChainId) as TChainId },
      { refetchOnMountOrArgChange: ACTION_CACHE, skip: !txReceipt },
    );

  const depositDone = useMemo(
    () => noratizedTx?.status === 'NOTARIZED_TRANSACTION_STATUS_CONFIRMED',
    [noratizedTx],
  );

  useEffect(() => {
    const confirmedOnChain = !!bridgeData;
    const isToChain = chainId === bridgeData?.chainId;

    if (confirmedOnChain && isToChain) {
      dispatch(changeProgress({ progress: 'claim' }));
    } else if (depositDone) {
      dispatch(changeProgress({ progress: 'switch-network' }));
    }

    return () => {
      dispatch(reset());
    };
  }, [noratizedTx, bridgeData, chainId, bridgeData, depositDone]);

  return {
    noratizedTx,
    txReceipt,
    bridgeData,
    isNoratizedTxLoading,
    isTxReceiptLoading,
    isBridgeDataLoading,
    depositDone,
  };
}
