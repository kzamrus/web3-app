import BigNumber from 'bignumber.js';
import { useBoringVaultV1 } from 'boring-vault-ui';
import { OLstvToken } from 'modules/api';
import { fromSatoshi } from 'modules/api/utils/convertSatoshi';
import { useConnection } from 'modules/auth';
import { AmountInput } from 'modules/common/components/AmountInput';
import {
  BTC_DECIMALS,
  DECIMAL_PLACES_BTC,
  SECURITY_FEE,
  ZERO,
} from 'modules/common/const';
import { useValidateAmount } from 'modules/common/hooks/useValidateAmount';
import { useTranslation } from 'modules/i18n';
import { useCallback, useEffect, useState } from 'react';
import { UseFormReturn, useController } from 'react-hook-form';
import { translation } from './translation';
import { IWithdrawalFormValues } from './useWithdrawalForm';

type AmountFieldProps = Pick<
  UseFormReturn<IWithdrawalFormValues>,
  'control' | 'setValue' | 'watch'
> & {
  disabled?: boolean;
};

const minAmount = SECURITY_FEE.plus(fromSatoshi(1));

export function AmountField({
  disabled,
  control,
  setValue,
}: AmountFieldProps): JSX.Element {
  const { isConnected, address } = useConnection();
  const { keys, t } = useTranslation(translation);

  const { isBoringV1ContextReady, fetchUserShares } = useBoringVaultV1();

  const [balance, setBalance] = useState(ZERO);

  useEffect(() => {
    if (!isBoringV1ContextReady || !address) return;
    fetchUserShares(address).then(shares => {
      setBalance(new BigNumber(shares));
    });
  }, [isBoringV1ContextReady]);

  const validateAmount = useValidateAmount({
    balance,
    minAmount,
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
      balanceText={t(keys.balanceText)}
      token={OLstvToken.LBTCV}
      onMaxClick={isConnected ? handleMaxClick : undefined}
      decimalPlaces={DECIMAL_PLACES_BTC}
      isDisabled={disabled}
      maxDecimalsLen={BTC_DECIMALS}
    />
  );
}
