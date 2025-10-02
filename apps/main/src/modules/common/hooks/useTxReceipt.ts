import { skipToken } from '@reduxjs/toolkit/query';
import { TChainId } from 'modules/api';
import { useEffect, useState } from 'react';
import { useGetTxReceiptQuery } from '../actions/getTxReceipt';
import { Milliseconds } from '../types';

const RECEIPT_POLLING_INTERVAL: Milliseconds = 5_000;
const ZERO_POLLING_INTERVAL: Milliseconds = 0;

export interface IUseTxReceipt {
  from?: string;
  blockNumber?: number;
  isSuccessful: boolean;
  isLoading: boolean;
}

// TODO useTxReceipt everywhere for polling confirmed txHash
export const useTxReceipt = (
  txHash?: string,
  chainId?: TChainId,
): IUseTxReceipt => {
  const [pollingInterval, setPollingInterval] = useState(
    RECEIPT_POLLING_INTERVAL,
  );

  const {
    isFetching: isReceiptLoading,
    data: receipt,
    isError: isReceiptError,
  } = useGetTxReceiptQuery(txHash ? { txHash, chainId } : skipToken, {
    pollingInterval,
  });

  const { status, from, blockNumber } = receipt || {};

  // TODO Remove
  console.log('status', status);

  // TODO Revert
  const isSuccessful = status === 'true';

  const isLoading =
    (!isSuccessful && !isReceiptError && !!txHash) || isReceiptLoading;

  const shouldStopPolling = isSuccessful || isReceiptError;

  useEffect(() => {
    if (shouldStopPolling) {
      setPollingInterval(ZERO_POLLING_INTERVAL);
    }
  }, [shouldStopPolling]);

  console.log('blockNumber', blockNumber);

  return {
    from,
    blockNumber: blockNumber ? parseInt(blockNumber) : undefined,
    isSuccessful,
    isLoading,
  };
};
