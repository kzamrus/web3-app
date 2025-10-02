import { Box, BoxProps, Button, useMediaQuery, useTheme } from '@mui/material';
import { useAmountFieldStyles } from './useAmountFieldStyles';
import {
  IInputNumberProps,
  InputNumber,
} from 'modules/common/components/InputNumber';
import { default as LBTC } from '../../icons/lbtc.svg?react';
import { SendTxFormValues } from '../BridgeForm/types';
import { ControllerRenderProps } from 'react-hook-form';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import BigNumber from 'bignumber.js';
import { ACTION_CACHE_LONG } from 'modules/common/const';
import { useGetBtcPriceQuery } from 'modules/common/actions/getBtcPrice';
import { amountDisplay } from 'modules/bridge/utils/amountDisplay';
import { IuseSendTx } from '../BridgeForm/useSendTx';
import { parseNumber } from 'modules/bridge/utils/parseNumber';

export function AmountField({
  field,
  sx,
  className,
  disabled,
  setValue,
  max,
}: Pick<IuseSendTx, 'setValue'> & {
  field: ControllerRenderProps<SendTxFormValues, 'amount'>;
  max: BigNumber;
} & Pick<BoxProps, 'sx' | 'className'> &
  Pick<IInputNumberProps, 'disabled'>): JSX.Element {
  const { classes, cx } = useAmountFieldStyles({});
  const { t, keys } = useTranslation(translation);
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { data: btcPrice = 0 } = useGetBtcPriceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_LONG,
  });

  const amount = new BigNumber(field.value || '');

  const Balance = (
    <Box className={classes.balance}>
      <span>{t(keys.balance, { balance: amountDisplay(max) })}</span>
      <Button
        className={classes.maxBtn}
        variant="text"
        onClick={() => field.onChange?.(amountDisplay(max))}
      >
        {t(keys.max)}
      </Button>
    </Box>
  );

  return (
    <Box className={cx(classes.root, className)} sx={sx}>
      <Box className={classes.inputWrapper}>
        <InputNumber
          {...field}
          onBlur={e => setValue('amount', parseNumber(e.currentTarget.value))}
          disabled={disabled}
          placeholder="0"
        />

        <span className="the-usd">
          ${amount.gt(0) ? amountDisplay(amount.multipliedBy(btcPrice)) : 0}
        </span>

        {onlyMediumScreen && Balance}
      </Box>

      <Box
        className={classes.suffix}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Box className={classes.symbol}>
          <LBTC />
          <span className="coin">{t(keys.lbtc)}</span>
        </Box>
        {!onlyMediumScreen && Balance}
      </Box>
    </Box>
  );
}
