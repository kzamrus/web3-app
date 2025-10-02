import { Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import FireIcon from './assets/fire.svg?react';
import { translation } from './translation';
import { useStakeFBTCStyles } from './useStakeFBTCStyles';

const FBTC_SALES_LINK =
  'https://share.hsforms.com/1ifMBLRHtSleT4iRDFtXHSArhw20';

export function StakeFBTC(): JSX.Element {
  const { classes } = useStakeFBTCStyles();
  const { keys, t } = useTranslation(translation);

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.text}>
        <FireIcon className={classes.icon} />

        {t(keys.text, { link: FBTC_SALES_LINK }, true)}
      </Typography>
    </div>
  );
}
