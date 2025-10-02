import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { StakeBtn } from '../StakeBtn';
import { CurrentStakes } from './CurrentStakes';
import { translation } from './translation';
import { useDepositsCapStyles } from './useDepositsCapStyles';

export function DepositsCap(): JSX.Element {
  const { classes } = useDepositsCapStyles();
  const { keys, t } = useTranslation(translation);

  return (
    <Paper className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {t(keys.title)}
      </Typography>

      <CurrentStakes />

      <StakeBtn />
    </Paper>
  );
}
