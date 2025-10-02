import { UseFormReturn, useController } from 'react-hook-form';
import { Box, InputBase, MenuItem, Select, SxProps } from '@mui/material';
import { default as Angle } from '../../assets/angle.svg?react';
import { Tokens } from '../../types';
import { IDepositlFormValues } from '../DepositForm/useDepositForm';
import { useSelectTokenFieldStyles } from './useSelectTokenFieldStyles';
import { default as LBTC } from '../../assets/lbtc.svg?react';
import { default as WBTC } from '../../assets/wbtc.svg?react';
import { useTranslation } from 'modules/i18n';
import { translation } from './translations';

type AmountFieldProps = Pick<
  UseFormReturn<IDepositlFormValues>,
  'control' | 'setValue' | 'watch'
> & {
  disabled?: boolean;
  sx?: SxProps;
  className?: string;
};

const renderItems = () => [
  {
    label: Tokens.LBTC,
    value: Tokens.LBTC,
    image: <LBTC width={26} height={26} />,
  },
  {
    label: Tokens.wBTC,
    value: Tokens.wBTC,
    image: <WBTC width={26} height={26} />,
  },
];

export function SelectTokenField({
  disabled,
  control,
  setValue,
  sx,
  className,
}: AmountFieldProps): JSX.Element {
  const { classes, cx } = useSelectTokenFieldStyles();
  const { t, keys } = useTranslation(translation);

  const { field } = useController({
    name: 'selectedToken',
    control,
  });

  const items = renderItems();

  const renderValue = (value: Tokens) => {
    const { image, label } = items.find(el => el.value === value)!;
    return (
      <Box className={classes.item} sx={{ display: 'flex' }} gap={1}>
        {image}
        {label}
      </Box>
    );
  };

  return (
    <Box className={cx(classes.root, className)} sx={sx}>
      <div className={classes.labelBox}>
        <label className={classes.label}>{t(keys.label)}</label>
      </div>
      <Select
        {...field}
        className={classes.select}
        disabled={disabled}
        onChange={e => setValue('selectedToken', e.target.value as Tokens)}
        input={<InputBase />}
        IconComponent={Angle}
        renderValue={renderValue}
      >
        {items.map(item => (
          <MenuItem
            className={classes.item}
            key={`${item.label}-${item.value}`}
            value={item.value}
          >
            <Box sx={{ display: 'flex' }} gap={1}>
              {item.image}
              {item.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
