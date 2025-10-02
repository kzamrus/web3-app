import BigNumber from 'bignumber.js';
import { ONativeToken } from 'modules/api';
import { useBtcConnection } from 'modules/auth';
import { AmountInput } from 'modules/common/components/AmountInput';
import {
  ACTION_CACHE,
  BTC_DECIMALS,
  DECIMAL_PLACES_BTC,
  MIN_STAKE_AMOUNT,
} from 'modules/common/const';
import { useValidateAmount } from 'modules/common/hooks/useValidateAmount';
import { useGetBtcBalanceQuery } from 'modules/deposit-btc/actions/getBtcBalance';
import { useTranslation } from 'modules/i18n';
import { useCallback } from 'react';
import { Control, UseFormSetValue, useController } from 'react-hook-form';
import { translation } from './translation';
import { IDepositFormValues } from './types';

interface IAmountFieldProps {
  control: Control<IDepositFormValues>;
  setValue: UseFormSetValue<IDepositFormValues>;
}

export function AmountField({
  control,
  setValue,
}: IAmountFieldProps): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const { isConnected } = useBtcConnection();

  const { data: btcBalance, isLoading: isBtcBalanceLoading } =
    useGetBtcBalanceQuery(undefined, {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: ACTION_CACHE,
      skip: !isConnected,
    });

  const { spendableBalance = 0, lockedBalance = 0 } = btcBalance || {};

  const balance = new BigNumber(spendableBalance);

  const validateAmount = useValidateAmount({
    balance,
    minAmount: MIN_STAKE_AMOUNT,
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
  }, [btcBalance, setValue]);

  const balanceTooltip = !!lockedBalance ? (
    <>
      <p>{t(keys.lockedBalance, { value: lockedBalance })}</p>

      <p>{t(keys.lockedBalanceDescr)}</p>
    </>
  ) : undefined;

  return (
    <AmountInput
      {...field}
      labelText={t(keys.amountLabel)}
      helperText={error?.message}
      balance={balance}
      balanceTooltip={balanceTooltip}
      isBalanceLoading={isBtcBalanceLoading}
      token={ONativeToken.BTC}
      onMaxClick={handleMaxClick}
      decimalPlaces={DECIMAL_PLACES_BTC}
      maxDecimalsLen={BTC_DECIMALS}
    />
  );
}
