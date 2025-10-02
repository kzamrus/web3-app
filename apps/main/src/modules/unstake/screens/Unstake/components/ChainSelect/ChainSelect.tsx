import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputBase,
  MenuItem,
  Select,
} from '@mui/material';
import { SUPPORTED_CHAINS } from 'modules/api';
import { useConnection } from 'modules/auth';
import { useGetLbtcBalanceQuery } from 'modules/common/actions/getLbtcBalance';
import { ACTION_CACHE } from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { UseFormReturn, useController } from 'react-hook-form';
import { IUnstakingFormValues } from '../../types';
import { ChainSelectValue } from './ChainSelectValue';
import { ChainSelectedValue } from './ChainSelectedValue';
import { translation } from './translation';

const selectId = 'chain-select';

type ChainSelectProps = Pick<UseFormReturn<IUnstakingFormValues>, 'control'> & {
  disabled?: boolean;
};

export function ChainSelect({
  control,
  disabled,
}: ChainSelectProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { isConnected } = useConnection();

  const { data: balancesData } = useGetLbtcBalanceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE,
    skip: !isConnected,
  });

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'chain',
    control,
  });

  return (
    <FormControl fullWidth>
      <FormLabel id={selectId} sx={{ mb: 1 }}>
        {t(keys.label)}
      </FormLabel>

      <Select
        {...field}
        labelId={selectId}
        input={<InputBase />}
        renderValue={value => <ChainSelectedValue chainId={value} />}
        disabled={disabled}
      >
        {SUPPORTED_CHAINS.map(chain => (
          <MenuItem key={chain} value={chain}>
            <ChainSelectValue
              chainId={chain}
              balance={
                isConnected && balancesData
                  ? balancesData.chains[chain]
                  : undefined
              }
            />
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
