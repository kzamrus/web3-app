import { InputBase, MenuItem, Select } from '@mui/material';
import { default as Angle } from '../../assets/angle.svg?react';

import { TFunction, useTranslation } from 'modules/i18n';
import { EVaultDailyPeriod } from 'modules/vault/api/getVaultDailyInfo';
import { FC, useEffect, useState } from 'react';
import { translation } from './translation';
import { usePeriodSelectStyles } from './usePeriodSelectStyles';

const renderItems = (t: TFunction, keys: Record<string, string>) => [
  { label: t(keys.menu1), value: EVaultDailyPeriod.D7 },
  { label: t(keys.menu2), value: EVaultDailyPeriod.D30 },
];

export const PeriodSelect: FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  const { classes } = usePeriodSelectStyles();
  const { t, keys } = useTranslation(translation);
  const items = renderItems(t, keys);
  const [value, setValue] = useState(items[0].value);

  useEffect(() => {
    if (onChange) {
      value && onChange(value);
    }
  }, [value]);

  const renderValue = (value: EVaultDailyPeriod) => (
    <>{items.find(el => el.value === value)?.label}</>
  );

  return (
    <Select
      className={classes.custom}
      value={value}
      onChange={e => setValue(Number(e.target.value))}
      input={<InputBase />}
      IconComponent={Angle}
      renderValue={renderValue}
    >
      {items.map(item => (
        <MenuItem key={`${item.label}-${item.value}`} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};
