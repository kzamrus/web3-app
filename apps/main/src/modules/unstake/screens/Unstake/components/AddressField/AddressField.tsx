import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { InputBase } from 'modules/common/components/InputBase';
import { useDetectMobile } from 'modules/common/hooks/useDetectMobile';
import { useTranslation } from 'modules/i18n';
import { useEffect } from 'react';
import { UseFormReturn, useController } from 'react-hook-form';
import { IUnstakingFormValues } from '../../types';
import { translation } from './translation';
import { useAddressField } from './useAddressField';
import { useAddressFieldStyles } from './useAddressFieldStyles';

const inputId = 'address-input';

type AddressFieldProps = Pick<
  UseFormReturn<IUnstakingFormValues>,
  'control' | 'setValue'
> & {
  disabled?: boolean;
};

export function AddressField({
  disabled,
  control,
  setValue,
}: AddressFieldProps): JSX.Element {
  const { classes, cx } = useAddressFieldStyles();
  const { keys, t } = useTranslation(translation);
  const { address, isConnected, btcWallet, onConnectClick, validate } =
    useAddressField();

  const isMobile = useDetectMobile();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'btcAddress',
    control,
    rules: { validate },
  });

  useEffect(() => {
    setValue('btcAddress', address ?? '');
  }, [address, setValue]);

  return (
    <FormControl fullWidth>
      <FormLabel htmlFor={inputId} sx={{ mb: 1 }}>
        {t(keys.recepient)}
      </FormLabel>

      <Box sx={{ position: 'relative' }}>
        <InputBase
          fullWidth
          {...field}
          className={cx(!isMobile && classes.input)}
          id={inputId}
          placeholder={t(keys.pasteAddress)}
          disabled={isConnected || disabled}
        />

        {!isMobile && (
          <Button
            className={classes.connectWalletBtn}
            size="small"
            color="secondary"
            variant="contained"
            onClick={onConnectClick}
            disabled={disabled}
          >
            {isConnected
              ? t(keys.disconnectWallet, { wallet: btcWallet })
              : t(keys.connectWallet)}
          </Button>
        )}
      </Box>

      {error?.message && (
        <FormHelperText error sx={{ m: 0, mt: 0.5 }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
