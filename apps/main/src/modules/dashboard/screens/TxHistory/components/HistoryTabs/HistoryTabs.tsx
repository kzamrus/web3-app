import { useConnection } from 'modules/auth';
import { featureConfig } from 'modules/common/featureConfig';
import {
  OTxHistoryTab,
  dashboardRouteConfig,
} from 'modules/dashboard/getDashboardRoutes';
import { useTranslation } from 'modules/i18n';
import { HistoryTab } from './HistoryTab';
import { translation } from './translation';
import { useHistoryTabsStyles } from './useHistoryTabsStyles';

export function HistoryTabs(): JSX.Element {
  const { classes } = useHistoryTabsStyles();
  const { keys, t } = useTranslation(translation);
  const { txsTab } = dashboardRouteConfig.main.useParams();
  const { isConnected } = useConnection();

  return (
    <div className={classes.root}>
      <HistoryTab
        href={dashboardRouteConfig.main.generatePath()}
        isActive={txsTab === OTxHistoryTab.stake}
      >
        {t(keys.stake)}
      </HistoryTab>

      <HistoryTab
        href={dashboardRouteConfig.main.generatePath(OTxHistoryTab.unstake)}
        isActive={txsTab === OTxHistoryTab.unstake}
        disabled={
          !featureConfig.isUnstakeAvailable ||
          !featureConfig.unstakeHistory ||
          !isConnected
        }
      >
        {t(keys.unstake)}
      </HistoryTab>
    </div>
  );
}
