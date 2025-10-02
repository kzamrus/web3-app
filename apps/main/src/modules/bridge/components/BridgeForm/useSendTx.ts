import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from 'react-hook-form';
import { SendTxFormValues } from './types';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OChainId, TChainId, checkNetwork } from 'modules/api';
import { useDepositToBridge } from 'modules/bridge/hooks/useDepositToBridge';
import { useSelector } from 'react-redux';
import { selectBridgeState } from 'modules/bridge/store/bridgeSlice';
import BigNumber from 'bignumber.js';
import { useConnection } from 'modules/auth';

export interface IuseSendTx {
  control: Control<SendTxFormValues>;
  watch: UseFormWatch<SendTxFormValues>;
  register: UseFormRegister<SendTxFormValues>;
  errors: FieldErrors<SendTxFormValues>;
  handleSubmit: UseFormHandleSubmit<SendTxFormValues, undefined>;
  isApproving: boolean;
  setValue: UseFormSetValue<SendTxFormValues>;
  approved: boolean;
  isSending: boolean;
  onApprove: (data: SendTxFormValues) => void;
  onSend: (data: SendTxFormValues) => void;
  onSwitchNetwork: () => void;
  invalidChain: boolean;
  onInvalid: () => void;
  isSwitching: boolean;
}

export function useSendTx(): IuseSendTx {
  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm<SendTxFormValues>({
    defaultValues: {
      amount: '',
      from: OChainId.holesky,
      to: OChainId.scroll,
    },
  });
  const {
    isApproveToBridgeLoading: isApproving,
    isDepositToBridgeLoading: isSending,
    onApproveToBridgeClick,
    onDepositToBridgeClick,
  } = useDepositToBridge({});
  const navigate = useNavigate();
  const bridgeState = useSelector(selectBridgeState);
  const fromChainId = watch('from');
  const { chainId, address } = useConnection();
  const [isSwitching, setIsSwitching] = useState(false);

  const invalidChain = useMemo(() => {
    return chainId !== fromChainId;
  }, [chainId, fromChainId]);

  const onSwitchNetwork = useCallback(async () => {
    try {
      setIsSwitching(true);
      await checkNetwork(fromChainId);
      setIsSwitching(false);
    } catch (e) {
      setIsSwitching(false);
    }
  }, [fromChainId]);

  const onApprove = useCallback(
    async (data: SendTxFormValues) => {
      await checkNetwork(data.from as TChainId);
      onApproveToBridgeClick(new BigNumber(data.amount), data.from as TChainId);
    },
    [onApproveToBridgeClick],
  );

  const onSend = useCallback(
    async (data: SendTxFormValues) => {
      if (!address) {
        return;
      }
      if (invalidChain) {
        await checkNetwork(data.from as TChainId);
        return;
      }

      onDepositToBridgeClick(
        new BigNumber(data.amount),
        data.from as TChainId,
        data.to as TChainId,
        address,
      );
    },
    [navigate, address, invalidChain, checkNetwork],
  );

  const onInvalid = useCallback(async () => {
    if (invalidChain) {
      await onSwitchNetwork();
      return;
    }
  }, [invalidChain, fromChainId, onSwitchNetwork]);

  return {
    control,
    watch,
    register,
    errors,
    handleSubmit,
    isApproving,
    isSending,
    approved: bridgeState.approved,
    onApprove,
    onSend,
    setValue,
    onSwitchNetwork,
    invalidChain,
    onInvalid,
    isSwitching,
  };
}
