import { useCallback } from 'react';
import { useConnection } from 'modules/auth';
import { TChainId } from 'modules/api';
import { useWithdrawFromBridgeMutation } from '../actions/withdrawFromBridge';
import { useGetTxReceiptQuery } from 'modules/common/actions/getTxReceipt';
import { useDispatch } from 'react-redux';
import { changeProgress, setClaimedTxHash } from '../store/bridgeSlice';

interface IUseWithdrawFromBridgeArgs {
  txHash: string;
  chainId: number;
}

interface IUseWithdraw {
  isWithdrawFromBridgeLoading: boolean;
  onWithdrawFromBridgeClick: () => void;
}

export function useWithdrawFromBridge({
  txHash,
  chainId,
}: IUseWithdrawFromBridgeArgs): IUseWithdraw {
  const { address } = useConnection();
  const [withdrawFromBridge, { isLoading: isWithdrawFromBridgeLoading }] =
    useWithdrawFromBridgeMutation();
  const { data: receipt } = useGetTxReceiptQuery({
    txHash,
    chainId: chainId as TChainId,
  });
  const distapch = useDispatch();

  const onWithdrawFromBridgeSuccess = useCallback(
    (txHash: string) => {
      if (txHash) {
        distapch(setClaimedTxHash({ claimedTxHash: txHash }));
        distapch(changeProgress({ progress: 'finish' }));
      }
    },
    [txHash],
  );

  const onWithdrawFromBridgeClick = useCallback(() => {
    if (!address || !txHash || !chainId || !receipt) {
      return;
    }

    withdrawFromBridge({
      txHash,
      chainId: chainId as TChainId,
      receipt,
    })
      .unwrap()
      .then(onWithdrawFromBridgeSuccess)
      .catch(error => console.error(error));
  }, [withdrawFromBridge, address, chainId, receipt]);

  return {
    onWithdrawFromBridgeClick,
    isWithdrawFromBridgeLoading,
  };
}
