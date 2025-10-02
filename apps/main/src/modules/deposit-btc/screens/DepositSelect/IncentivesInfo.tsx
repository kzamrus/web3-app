import { Box } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { StakeInfoItem } from './components/StakeInfo';
import { translation } from './translation';

export function IncentivesInfo(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  return (
    <StakeInfoItem
      label={t(keys.incentives.title)}
      value={
        <Box
          component="span"
          sx={{ color: theme => theme.palette.customMain[800] }}
        >
          {t(keys.incentives.descr)}
        </Box>
      }
      labelTooltip={t(keys.incentives.tooltip)}
    />
  );
}
