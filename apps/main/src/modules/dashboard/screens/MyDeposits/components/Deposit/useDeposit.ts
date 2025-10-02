import { IDeposit, TChainId } from 'modules/api';
import { useClaimLBTCMutation } from 'modules/dashboard/actions/claimLBTC';
import { dashboardRouteConfig } from 'modules/dashboard/getDashboardRoutes';
import { addOptimisticClaim } from 'modules/dashboard/store/dashboardSlice';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useActiveDeposits } from '../../hooks/useActiveDeposits';

const ONE_CONFIRMATION = 1;

interface IUseDepositArgs {
  txId: string;
  txIndex: number;
  currentBlockHeight?: number;
}

interface IUseDeposit {
  amount: number;
  chainId: TChainId;
  currentConfirmations: number;
  isClaimLoading: boolean;
  isClaimDisabled: boolean;
  isRestricted?: boolean;
  onClaimClick: () => void;
}

export function useDeposit({
  txId,
  txIndex,
  currentBlockHeight,
}: IUseDepositArgs): IUseDeposit {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeDeposits } = useActiveDeposits();

  const {
    value: amount,
    chainId,
    rawPayload,
    signature: proofSignature,
    blockHeight,
    isRestricted,
  } = useMemo(
    () =>
      activeDeposits.find(deposit =>
        deposit.index
          ? deposit.txid === txId && deposit.index === txIndex
          : deposit.txid === txId,
      ) as IDeposit,
    [activeDeposits, txId],
  );

  const [claim, { isLoading: isClaimLoading }] = useClaimLBTCMutation();

  const isClaimDisabled = !proofSignature || !rawPayload;

  const currentConfirmations = calcConfirmations(
    currentBlockHeight,
    blockHeight,
  );

  const onClaimSuccess = useCallback(
    (txHash: string) => {
      const path = dashboardRouteConfig.claimStatus.generatePath({
        txHash,
        network: `${chainId}`,
      });
      navigate(path);

      dispatch(addOptimisticClaim({ txId, timestamp: Date.now() }));
    },
    [chainId, txId, navigate],
  );

  const onClaimClick = useCallback(() => {
    if (!proofSignature || !rawPayload) {
      return;
    }

    claim({
      chainId,
      data: rawPayload,
      proofSignature,
    })
      .unwrap()
      .then(onClaimSuccess)
      .catch(() => {});
  }, [claim, chainId, rawPayload, proofSignature, amount]);

  return {
    amount,
    chainId,
    currentConfirmations,
    isClaimLoading,
    isClaimDisabled,
    isRestricted,
    onClaimClick,
  };
}

function calcConfirmations(
  blockHeight?: number,
  depositBlockHeight?: number,
): number {
  if (!depositBlockHeight || !blockHeight) {
    return 0;
  }

  // depposit block height is the first confirmation
  return blockHeight - depositBlockHeight + ONE_CONFIRMATION;
}
