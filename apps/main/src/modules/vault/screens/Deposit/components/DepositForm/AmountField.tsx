import BigNumber from 'bignumber.js';
import { fromSatoshi } from 'modules/api/utils/convertSatoshi';
import { useConnection } from 'modules/auth';
import { AmountInput } from 'modules/common/components/AmountInput';
import {
  ACTION_CACHE,
  BTC_DECIMALS,
  DECIMAL_PLACES_BTC,
  SECURITY_FEE,
  ZERO,
} from 'modules/common/const';
import { useValidateAmount } from 'modules/common/hooks/useValidateAmount';
import { useTranslation } from 'modules/i18n';
import { useCallback, useMemo } from 'react';
import { UseFormReturn, useController } from 'react-hook-form';
import { translation } from './translation';
import { IDepositlFormValues } from './useDepositForm';
import { useGetTokenBalanceQuery } from 'modules/common/actions/getTokenBalance';
import { OLstToken } from 'modules/api';

type AmountFieldProps = Pick<
  UseFormReturn<IDepositlFormValues>,
  'control' | 'setValue' | 'watch'
> & {
  disabled?: boolean;
};

const minAmount = SECURITY_FEE.plus(fromSatoshi(1));

export function AmountField({
  disabled,
  control,
  setValue,
  watch,
}: AmountFieldProps): JSX.Element {
  const { isConnected } = useConnection();
  const { keys, t } = useTranslation(translation);

  const selectedToken = watch('selectedToken');

  const { data: balancesLtcData, isLoading: isLbtBalanceLoading } =
    useGetTokenBalanceQuery(
      { token: OLstToken.LBTC },
      {
        refetchOnMountOrArgChange: ACTION_CACHE,
        skip: !isConnected,
      },
    );

  const { data: balancesWtcData, isLoading: isWbtcBalanceLoading } =
    useGetTokenBalanceQuery(
      { token: OLstToken.WBTC },
      {
        refetchOnMountOrArgChange: ACTION_CACHE,
        skip: !isConnected,
      },
    );

  const isLoading = isLbtBalanceLoading || isWbtcBalanceLoading;

  const balanceData = useMemo(
    () => ({
      LBTC: balancesLtcData,
      wBTC: balancesWtcData,
    }),
    [balancesLtcData, balancesWtcData],
  );

  const chainId = watch('chain');
  const balance = balanceData[selectedToken]?.chains[chainId] ?? ZERO;

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
      labelText={t(
        selectedToken === 'LBTC' ? keys.LBTCamountLabel : keys.wBTCamountLabel,
      )}
      helperText={error?.message}
      balance={isConnected ? balance : undefined}
      balanceText={t(keys.balanceText)}
      isBalanceLoading={isLoading}
      token={selectedToken}
      onMaxClick={isConnected ? handleMaxClick : undefined}
      decimalPlaces={DECIMAL_PLACES_BTC}
      isDisabled={disabled}
      maxDecimalsLen={BTC_DECIMALS}
    />
  );
}
