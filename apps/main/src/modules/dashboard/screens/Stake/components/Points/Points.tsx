import { Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { PointsBox } from '../PointsBox';
import { translation } from './translation';
import { usePointsStyles } from './usePointsStyles';

const DEFI_PAGE_LINK = 'https://www.lombard.finance/app/defi/';

export function Points(): JSX.Element {
  const { classes } = usePointsStyles();
  const { keys, t } = useTranslation(translation);

  return (
    <PointsBox>
      <Typography className={classes.title} variant="h3">
        {t(keys.title)}
      </Typography>

      <Typography className={classes.text}>
        {t(keys.text, { link: DEFI_PAGE_LINK }, true)}
      </Typography>
    </PointsBox>
  );
}
