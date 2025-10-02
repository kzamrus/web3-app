import BigNumber from 'bignumber.js';
import { OLstToken } from 'modules/api';
import { useConnection } from 'modules/auth';
import { useGetLbtcBalanceQuery } from 'modules/common/actions/getLbtcBalance';
import { AmountInput } from 'modules/common/components/AmountInput';
import {
  ACTION_CACHE,
  BTC_DECIMALS,
  DECIMAL_PLACES_BTC,
  MIN_UNSTAKE_AMOUNT,
  ZERO,
} from 'modules/common/const';
import { useValidateAmount } from 'modules/common/hooks/useValidateAmount';
import { useTranslation } from 'modules/i18n';
import { useCallback } from 'react';
import { UseFormReturn, useController } from 'react-hook-form';
import { IUnstakingFormValues } from '../../types';
import { translation } from './translation';

type AmountFieldProps = Pick<
  UseFormReturn<IUnstakingFormValues>,
  'control' | 'setValue' | 'watch'
> & {
  disabled?: boolean;
};

export function AmountField({
  disabled,
  control,
  setValue,
  watch,
}: AmountFieldProps): JSX.Element {
  const { isConnected } = useConnection();
  const { keys, t } = useTranslation(translation);

  const { data: balancesData, isLoading: isBalanceLoading } =
    useGetLbtcBalanceQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE,
      skip: !isConnected,
    });

  const chainId = watch('chain');
  const balance = balancesData?.chains[chainId] ?? ZERO;

  const validateAmount = useValidateAmount({
    balance,
    minAmount: MIN_UNSTAKE_AMOUNT,
  });

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'amount',
    control,
    rules: {
      validate: validateAmount,
    },
  });

  const handleMaxClick = useCallback(() => {
    const amount = balance
      .decimalPlaces(DECIMAL_PLACES_BTC, BigNumber.ROUND_DOWN)
      .toString();

    setValue('amount', amount, {
      shouldValidate: true,
    });
  }, [balance, setValue]);

  return (
    <AmountInput
      {...field}
      labelText={t(keys.amountLabel)}
      helperText={error?.message}
      balance={isConnected ? balance : undefined}
      isBalanceLoading={isBalanceLoading}
      token={OLstToken.LBTC}
      onMaxClick={isConnected ? handleMaxClick : undefined}
      decimalPlaces={DECIMAL_PLACES_BTC}
      isDisabled={disabled}
      maxDecimalsLen={BTC_DECIMALS}
    />
  );
}
