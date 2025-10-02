import { OChainId, SANCTIONED_ADDRESS } from 'modules/api';
import { useConnection } from 'modules/auth';
import { ACTION_CACHE_LONG, IS_PROD } from 'modules/common/const';
import { useConfirmLbtcAddressDestMutation } from 'modules/deposit-btc/actions/confirmLbtcAddressDest';
import { useGetDepositBtcAddressQuery } from 'modules/deposit-btc/actions/getDepositBtcAddress';
import { depositBtcRouteConfig } from 'modules/deposit-btc/depositBtcRoutesConfig';
import { FormEventHandler, useCallback } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IDepositSelectFormValues } from './types';

const defaultChainValue = IS_PROD ? OChainId.ethereum : OChainId.holesky;

interface IuseDepositSelect {
  evmWalletAddress?: string;
  control: Control<IDepositSelectFormValues>;
  depositAddress?: string;
  isChainSelected: boolean;
  isConnected: boolean;
  isDepositAddressLoading: boolean;
  isAddressConfirmed: boolean;
  isConfirmLoading: boolean;
  isSanctionedAddress: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onAddressConfirm: () => void;
}

export function useDepositSelect(): IuseDepositSelect {
  const navigate = useNavigate();
  const { address: evmWalletAddress, isConnected } = useConnection();

  const { control, watch, handleSubmit } = useForm<IDepositSelectFormValues>({
    defaultValues: {
      chain: defaultChainValue,
    },
  });

  const chainValue = watch('chain');

  const isChainSelected = chainValue !== OChainId.unsupported;

  const [getAddressConfirmation, { isLoading: isConfirmLoading }] =
    useConfirmLbtcAddressDestMutation();

  const { data: depositAddress, isLoading: isDepositAddressLoading } =
    useGetDepositBtcAddressQuery(chainValue, {
      refetchOnMountOrArgChange: ACTION_CACHE_LONG,
      skip: !isConnected || !isChainSelected,
    });

  const onSubmit = useCallback(
    handleSubmit(({ chain }) => {
      const path = depositBtcRouteConfig.main.generatePath({
        chain,
      });

      navigate(path);
    }),
    [navigate],
  );

  const onAddressConfirm = useCallback(() => {
    getAddressConfirmation(chainValue);
  }, [chainValue, getAddressConfirmation]);

  return {
    evmWalletAddress,
    control,
    depositAddress: depositAddress ?? undefined,
    isChainSelected,
    isConnected,
    isDepositAddressLoading,
    isAddressConfirmed: !!depositAddress,
    isConfirmLoading: isConfirmLoading || isDepositAddressLoading,
    // todo: implement the check for sanctioned address
    isSanctionedAddress: depositAddress === SANCTIONED_ADDRESS,
    onSubmit,
    onAddressConfirm,
  };
}
