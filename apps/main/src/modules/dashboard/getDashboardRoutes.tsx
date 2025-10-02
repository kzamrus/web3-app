import { lazy, Suspense } from 'react';
import { createSearchParams, Route } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { ROOT_PATH } from 'modules/common/const';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

export const OTxHistoryTab = {
  stake: 'stake',
  unstake: 'unstake',
} as const;

export type TTxHistoryTab = (typeof OTxHistoryTab)[keyof typeof OTxHistoryTab];

const CLAIM_STATUS_PATH = `${ROOT_PATH}claim-status/`;

export const dashboardRouteConfig = createRouteConfig(
  {
    main: {
      path: ROOT_PATH,
      generatePath: (txsTab?: TTxHistoryTab) => {
        if (!txsTab) {
          return ROOT_PATH;
        }
        const searchParams = createSearchParams({ txs: txsTab });
        return `${ROOT_PATH}?${searchParams.toString()}`;
      },
      useParams: () => {
        const queryParams = useQueryParams();
        return {
          txsTab: getValidTxsTab(queryParams.get('txs')),
        };
      },
    },

    claimStatus: {
      path: CLAIM_STATUS_PATH,
      generatePath: ({
        txHash,
        network,
      }: {
        txHash: string;
        network: string;
      }) => {
        const searchParams = createSearchParams({ txHash, network });
        return `${CLAIM_STATUS_PATH}?${searchParams.toString()}`;
      },
      useParams: () => {
        const queryParams = useQueryParams();

        return {
          txHash: queryParams.get('txHash') ?? undefined,
          network: queryParams.get('network') ?? undefined,
        };
      },
    },
  },
  ROOT_PATH,
);

function getValidTxsTab(param: string | null): TTxHistoryTab {
  if (param === OTxHistoryTab.stake || param === OTxHistoryTab.unstake) {
    return param;
  }

  return OTxHistoryTab.stake;
}

const Dashboard = lazy(() =>
  import('./screens/Dashboard').then(({ Dashboard }) => ({
    default: Dashboard,
  })),
);

const ClaimStatus = lazy(() =>
  import('./screens/ClaimStatus').then(({ ClaimStatus }) => ({
    default: ClaimStatus,
  })),
);

export function getDashboardRoutes(): JSX.Element {
  return (
    <>
      <Route
        element={
          <Suspense fallback={<QueryLoading isAbsolute />}>
            <Dashboard />
          </Suspense>
        }
        path={dashboardRouteConfig.main.path}
      />

      <Route
        element={
          <Suspense fallback={<QueryLoading isAbsolute />}>
            <ClaimStatus />
          </Suspense>
        }
        path={dashboardRouteConfig.claimStatus.path}
      />
    </>
  );
}
