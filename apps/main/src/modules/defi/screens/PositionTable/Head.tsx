import { Box } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
// import { default as IconSort } from './assets/icon-sort.svg?react';
import { useStyles } from './useStyle';

export function Head(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useStyles();

  return (
    <Box className={classes.thead}>
      <Box flex={4}>{t(keys.assets)}</Box>
      <Box flex={2}>
        {t(keys.network)}
        {/* <IconSort /> */}
      </Box>
      <Box flex={2}>
        {t(keys.multiplier)}
        {/* <IconSort /> */}
      </Box>
      <Box flex={2}>
        {t(keys.tvl)}
        {/* <IconSort /> */}
      </Box>
      <Box flex={2}>{t(keys.yourPosition)}</Box>
      <Box width={40}></Box>
    </Box>
  );
}
