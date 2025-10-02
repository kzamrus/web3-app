import { skipToken } from '@reduxjs/toolkit/query';
import { OChainId } from 'modules/api';
import { useClaimLBTCMutation } from 'modules/claim-deposits/actions/claimLBTC';
import { useNotarizeOutputQuery } from 'modules/claim-deposits/actions/notarizeOutput';
import { claimDepositsRouteConfig } from 'modules/claim-deposits/getClaimDepositsRoutes';
import { ACTION_CACHE_LONG } from 'modules/common/const';
import { validateBitcoinTxId } from 'modules/common/utils/validateBitcoinTxId';
import { dashboardRouteConfig } from 'modules/dashboard';
import { showNotification } from 'modules/notifications';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUseClaimStatus {
  chainId: number;
  amount: number;
  txHash?: string;
  isNotarizeLoading: boolean;
  isClaimLoading: boolean;
  isDepositNotarized: boolean;
  onClaimClick: () => void;
}

export function useClaimStatus(): IUseClaimStatus {
  const { txHash } = claimDepositsRouteConfig.claim.useParams();
  const navigate = useNavigate();

  const { data: notarizedDeposit, isLoading: isNotarizeLoading } =
    useNotarizeOutputQuery(txHash || skipToken, {
      refetchOnMountOrArgChange: ACTION_CACHE_LONG,
      skip: !validateBitcoinTxId(txHash),
    });

  const [claim, { isLoading: isClaimLoading }] = useClaimLBTCMutation();

  const isDepositNotarized = !!notarizedDeposit;

  const { chainId = OChainId.unsupported, amount = 0 } = notarizedDeposit || {};

  const onClaimClick = useCallback(() => {
    if (!isDepositNotarized) {
      showNotification({
        message: 'Notarized deposit not found',
        variant: 'error',
      });
      return;
    }

    claim({
      chainId,
      data: notarizedDeposit.rawPayload,
      proofSignature: notarizedDeposit.proofSignature,
    })
      .unwrap()
      .then(txHash => {
        showNotification({
          header: 'Claim successfully',
          message: `You have successfully claimed ${amount} LBTC. Your transaction hash is ${txHash}`,
          variant: 'success',
          persist: true,
        });

        const path = dashboardRouteConfig.main.generatePath();
        navigate(path);
      })
      .catch(() => {});
  }, [
    amount,
    isDepositNotarized,
    notarizedDeposit?.proofSignature,
    notarizedDeposit?.rawPayload,
    claim,
    navigate,
  ]);

  return {
    chainId,
    amount,
    txHash,
    isNotarizeLoading,
    isClaimLoading,
    isDepositNotarized,
    onClaimClick,
  };
}
