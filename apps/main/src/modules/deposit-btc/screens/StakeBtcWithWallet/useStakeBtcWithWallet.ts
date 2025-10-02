import { skipToken } from '@reduxjs/toolkit/query';
import { TBtcWalletId } from 'modules/api';
import { useBtcConnection, useConnection } from 'modules/auth';
import { useBtcConnectionModal } from 'modules/auth/hooks/useBtcConnectionModal';
import { ACTION_CACHE_LONG } from 'modules/common/const';
import { useDepositBtcMutation } from 'modules/deposit-btc/actions/depositBtc';
import { useGetDepositBtcAddressQuery } from 'modules/deposit-btc/actions/getDepositBtcAddress';
import { depositBtcRouteConfig } from 'modules/deposit-btc/depositBtcRoutesConfig';
import { useTranslation } from 'modules/i18n';
import { showNotification } from 'modules/notifications';
import { FormEventHandler } from 'react';
import { Control, UseFormSetValue, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { translation } from './translation';
import { IDepositFormValues } from './types';

interface IUseStakeBtcWithWallet {
  amount: string;
  control: Control<IDepositFormValues>;
  isDepositLoading: boolean;
  isReadyToDeposit: boolean;
  isBtcConnected: boolean;
  btcWalletId?: TBtcWalletId;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onConnectBtc: () => void;
  setValue: UseFormSetValue<IDepositFormValues>;
}

export function useStakeBtcWithWallet(): IUseStakeBtcWithWallet {
  const navigate = useNavigate();
  const { keys, t } = useTranslation(translation);

  const { onOpen: onConnectModalOpen } = useBtcConnectionModal();

  const { isConnected } = useConnection();

  const {
    isConnected: isBtcConnected,
    isLoading: isBtcConnectLoading,
    walletId: btcWalletId,
  } = useBtcConnection();

  const { chain } = depositBtcRouteConfig.main.useParams();

  const { control, handleSubmit, setValue, watch } =
    useForm<IDepositFormValues>({
      defaultValues: {
        amount: '',
      },
    });

  const amountValue = watch('amount');

  const { data: depositAddress, isLoading: isDepositAddressLoading } =
    useGetDepositBtcAddressQuery(chain && isConnected ? chain : skipToken, {
      refetchOnMountOrArgChange: ACTION_CACHE_LONG,
    });

  const isReadyToDeposit = !!depositAddress && !isDepositAddressLoading;

  const [deposit, { isLoading: isDepositLoading }] = useDepositBtcMutation();

  const onSubmit = handleSubmit(({ amount }) => {
    if (!isReadyToDeposit) {
      showNotification({
        message: t(keys.depositAddrError),
        variant: 'error',
      });

      return;
    }

    deposit({ amount: +amount, depositAddress })
      .unwrap()
      .then(txId => {
        const path = depositBtcRouteConfig.status.generatePath(txId);
        navigate(path);
      })
      .catch(() => {});
  });

  return {
    amount: amountValue.toString(),
    control,
    isDepositLoading: isDepositLoading || isBtcConnectLoading,
    isReadyToDeposit,
    isBtcConnected,
    btcWalletId,
    onSubmit,
    onConnectBtc: onConnectModalOpen,
    setValue,
  };
}
