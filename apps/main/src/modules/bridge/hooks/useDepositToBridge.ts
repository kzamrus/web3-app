import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDepositToBridgeMutation } from '../actions/depositToBridge';
import { useConnection } from 'modules/auth';
import BigNumber from 'bignumber.js';
import { useApproveToBridgeMutation } from '../actions/approveToBridge';
import { OLstToken, TChainId } from 'modules/api';
import { bridgeRoutesConfig } from '../bridgeRoutesConfig';
import { useDispatch } from 'react-redux';
import { changeApproved, setAmount } from '../store/bridgeSlice';
import { toSatoshi } from 'modules/api/utils/convertSatoshi';
import { getTokenAddress } from 'modules/api/web3SDK/utils/getTokenAddress';

interface IUseDepositToBridgeArgs {}

interface IUseDeposit {
  isDepositToBridgeLoading: boolean;
  isApproveToBridgeLoading: boolean;
  onDepositToBridgeClick: (
    amount: BigNumber,
    fromChain: TChainId,
    toChain: TChainId,
    toAddress: string,
  ) => void;
  onApproveToBridgeClick: (amount: BigNumber, fromChain: TChainId) => void;
}

export function useDepositToBridge({}: IUseDepositToBridgeArgs): IUseDeposit {
  const navigate = useNavigate();
  const { chainId } = useConnection();
  const [depositToBridge, { isLoading: isDepositToBridgeLoading }] =
    useDepositToBridgeMutation();
  const [approveToBridge, { isLoading: isApproveToBridgeLoading }] =
    useApproveToBridgeMutation();
  const dispatch = useDispatch();

  const onApproveToBridgeSuccess = useCallback(() => {
    dispatch(changeApproved({ approved: true }));
  }, [navigate]);

  const onDepositToBridgeSuccess = useCallback(
    (txHash: string, fromChain: TChainId) => {
      const path = bridgeRoutesConfig.bridgeProgress.generatePath({
        txHash,
        chainId: fromChain as TChainId,
      });
      navigate(path);
    },
    [navigate],
  );

  const onApproveToBridgeClick = useCallback(
    (amount: BigNumber, fromChain: TChainId) => {
      if (!chainId || !amount) {
        return;
      }

      const spender = getTokenAddress(chainId as TChainId, OLstToken.LBTC);

      approveToBridge({
        amount: toSatoshi(amount.toNumber()),
        spender,
        fromChain,
      })
        .unwrap()
        .then(onApproveToBridgeSuccess)
        .then(() => dispatch(setAmount({ amount })))
        .catch(error => console.error(error));
    },
    [approveToBridge, chainId],
  );

  const onDepositToBridgeClick = useCallback(
    (
      amount: BigNumber,
      fromChain: TChainId,
      toChain: TChainId,
      toAddress: string,
    ) => {
      if (!amount) {
        return;
      }

      depositToBridge({
        toChain,
        amount: toSatoshi(amount.toNumber()),
        toAddress,
      })
        .unwrap()
        .then((txHash: string) => onDepositToBridgeSuccess(txHash, fromChain))
        .catch(error => console.error(error));
    },
    [depositToBridge],
  );

  return {
    onDepositToBridgeClick,
    onApproveToBridgeClick,
    isDepositToBridgeLoading,
    isApproveToBridgeLoading,
  };
}
