import { Paper, Typography } from '@mui/material';
import {
  OTxHistoryTab,
  dashboardRouteConfig,
} from 'modules/dashboard/getDashboardRoutes';
import { useTranslation } from 'modules/i18n';
import { HistoryTabs } from './components/HistoryTabs';
import { StakesTable } from './components/StakesTable';
import { UnstakesTable } from './components/UnstakesTable';
import { translation } from './translation';
import { useTxHistoryStyles } from './useTxHistoryStyles';

export function TxHistory(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useTxHistoryStyles();
  const { txsTab } = dashboardRouteConfig.main.useParams();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h2">
        {t(keys.title)}
      </Typography>

      <Paper className={classes.paper}>
        <HistoryTabs />

        {txsTab === OTxHistoryTab.stake && <StakesTable />}

        {txsTab === OTxHistoryTab.unstake && <UnstakesTable />}
      </Paper>
    </div>
  );
}
