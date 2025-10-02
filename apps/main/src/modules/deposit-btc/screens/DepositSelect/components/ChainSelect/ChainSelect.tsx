import {
  FormControl,
  FormHelperText,
  InputBase,
  MenuItem,
  Select,
} from '@mui/material';
import { OChainId, TChainId } from 'modules/api';
import { useConnection } from 'modules/auth';
import { IS_PROD } from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { useCallback } from 'react';
import { Control, useController } from 'react-hook-form';
import { IDepositSelectFormValues } from '../../types';
import { ChainSelectValue } from './ChainSelectValue';
import { ChainSelectedValue } from './ChainSelectedValue';
import { translation } from './translation';

const chainsToSelect = IS_PROD ? [OChainId.ethereum] : [OChainId.holesky];

interface IChainSelectProps {
  control: Control<IDepositSelectFormValues>;
  className?: string;
}

export function ChainSelect({
  control,
  className,
}: IChainSelectProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { address } = useConnection();

  const validateSelect = useCallback(
    (value?: TChainId) => {
      return value === OChainId.unsupported ? t(keys.error) : undefined;
    },
    [t, keys.error],
  );

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'chain',
    control,
    rules: {
      validate: validateSelect,
    },
  });

  return (
    <FormControl className={className} fullWidth>
      <Select
        {...field}
        displayEmpty
        input={<InputBase />}
        renderValue={value => (
          <ChainSelectedValue chainId={value} address={address} />
        )}
      >
        <MenuItem value={OChainId.unsupported} disabled>
          <em>{t(keys.defaultSelect)}</em>
        </MenuItem>

        {chainsToSelect.map(chain => (
          <MenuItem key={chain} value={chain}>
            <ChainSelectValue chainId={chain} />
          </MenuItem>
        ))}
      </Select>

      {error?.message && (
        <FormHelperText sx={{ mt: 0.5 }} error>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
