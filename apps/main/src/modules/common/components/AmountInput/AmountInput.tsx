import { Box, FormHelperText, Skeleton, SxProps } from '@mui/material';
import BigNumber from 'bignumber.js';
import { ReactNode, forwardRef } from 'react';

import { DECIMAL_PLACES } from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { IInputNumberProps, InputNumber } from '../InputNumber';

import { getUniqueId } from 'modules/common/utils/getUniqueId';
import { Button } from '../Button';
import { InfoIconWithTooltip } from '../InfoIconWithTooltip';
import { translation } from './translation';
import { useAmountInputStyles } from './useAmountInputStyles';

const defaultInputId = `amount-input-${getUniqueId()}`;

type InputProps = Pick<
  IInputNumberProps,
  'onChange' | 'onBlur' | 'value' | 'name' | 'isIntegerOnly' | 'maxDecimalsLen'
>;

interface IAmountInputProps extends InputProps {
  balance?: BigNumber;
  balanceText?: string;
  balanceTooltip?: ReactNode;
  helperText?: string;
  id?: string;
  sx?: SxProps;
  token?: string;
  isDisabled?: boolean;
  isBalanceLoading?: boolean;
  labelTooltip?: ReactNode;
  labelText?: ReactNode;
  decimalPlaces?: number;
  onMaxClick?: VoidFunction;
}
export const AmountInput = forwardRef<HTMLInputElement, IAmountInputProps>(
  (
    {
      balance,
      balanceText: balanceTextProp,
      balanceTooltip,
      helperText,
      id = defaultInputId,
      sx,
      token,
      isDisabled,
      isBalanceLoading,
      labelTooltip,
      labelText,
      decimalPlaces = DECIMAL_PLACES,
      onMaxClick,
      ...inputProps
    },
    ref,
  ) => {
    const { classes } = useAmountInputStyles();
    const { t, keys } = useTranslation(translation);

    const withBalance = !!balance;

    const balanceText = t(keys.balance, {
      balance: balanceTextProp ?? t(keys.defaultBalanceText),
      value: t('unit.tokenValue', {
        token,
        value: balance
          ?.decimalPlaces(decimalPlaces, BigNumber.ROUND_DOWN)
          .toFormat(),
      }),
    });

    return (
      <Box sx={sx}>
        <div className={classes.labelBox}>
          <label className={classes.label} htmlFor={id}>
            {labelText || t(keys.amount)}

            {labelTooltip && (
              <InfoIconWithTooltip
                sx={{ ml: 0.5, fontSize: 20, color: 'text.secondary' }}
              >
                {labelTooltip}
              </InfoIconWithTooltip>
            )}
          </label>

          {withBalance && (
            <div
              className={classes.balance}
              title={balanceTooltip ? undefined : balance.toFormat()}
            >
              {isBalanceLoading ? (
                <>
                  <Skeleton
                    className={classes.balanceSkeleton}
                    variant="text"
                    width={30}
                  />

                  {token}
                </>
              ) : (
                balanceText
              )}

              {balanceTooltip && (
                <InfoIconWithTooltip>{balanceTooltip}</InfoIconWithTooltip>
              )}
            </div>
          )}
        </div>

        <div className={classes.inputBox}>
          <InputNumber
            ref={ref}
            fullWidth
            className={classes.input}
            disabled={isDisabled}
            id={id}
            placeholder="0"
            {...inputProps}
          />

          {onMaxClick && (
            <Button
              className={classes.maxButton}
              disabled={isDisabled}
              size="small"
              color="secondary"
              variant="contained"
              onClick={onMaxClick}
            >
              {t(keys.max)}
            </Button>
          )}
        </div>

        {helperText && (
          <FormHelperText error sx={{ mt: 0.5 }}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  },
);

AmountInput.displayName = 'AmountInput';
