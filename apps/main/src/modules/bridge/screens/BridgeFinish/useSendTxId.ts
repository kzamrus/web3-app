import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  useForm,
} from 'react-hook-form';
import { SendTxIdFormValues } from './types';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bridgeRoutesConfig } from 'modules/bridge/bridgeRoutesConfig';
import { useConnection } from 'modules/auth';
import { SUPPORTED_CHAINS, TChainId } from 'modules/api';
import { useBridgeFinish } from './useBridgeFinish';
import { showNotification } from 'modules/notifications';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { SUPPORTED_CHAINS_WITH_ICONS } from 'modules/bridge/utils/addChainIcons';

export interface IuseSendTxId {
  control: Control<SendTxIdFormValues>;
  watch: UseFormWatch<SendTxIdFormValues>;
  register: UseFormRegister<SendTxIdFormValues>;
  errors: FieldErrors<SendTxIdFormValues>;
  handleSubmit: UseFormHandleSubmit<SendTxIdFormValues, undefined>;
  isSending: boolean;
  onSendTxId: (data: SendTxIdFormValues) => Promise<void>;
}

const DEFAULT_CHAIN = SUPPORTED_CHAINS[0];

export function useSendTxId(): IuseSendTxId {
  const { keys, t } = useTranslation(translation);
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { chainId, isConnected } = useConnection();
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setValue,
  } = useForm<SendTxIdFormValues>({
    defaultValues: {
      txHash: '',
      chainId: (chainId ?? DEFAULT_CHAIN) as TChainId,
    },
  });
  const chanId = watch('chainId');
  const txHash = watch('txHash');
  const { txhashNotExists, bridgeData } = useBridgeFinish({
    chainIdParam: chanId,
    txHashParam: txHash,
  });

  useEffect(() => {
    if (isConnected) {
      if (
        !SUPPORTED_CHAINS_WITH_ICONS.find(chain => chain.chainId === chainId)
      ) {
        setValue('chainId', SUPPORTED_CHAINS_WITH_ICONS[0].chainId as TChainId);
      } else {
        setValue('chainId', chainId as TChainId);
      }
    }
  }, [isConnected, chainId]);

  const onSendTxId = useCallback(
    async (data: SendTxIdFormValues) => {
      try {
        if (txhashNotExists || !bridgeData) {
          showNotification({
            message: t(keys.txhashNotExists),
            variant: 'error',
          });
          return;
        }
        setIsSending(true);
        navigate(
          bridgeRoutesConfig.bridgeProgress.generatePath({
            txHash: data.txHash,
            chainId: data.chainId,
          }),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsSending(false);
      }
    },
    [navigate, txhashNotExists, bridgeData, t, keys],
  );

  return {
    control,
    watch,
    register,
    errors,
    handleSubmit,
    isSending,
    onSendTxId,
  };
}
