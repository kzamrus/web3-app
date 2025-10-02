import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { WalletGuard } from 'modules/early-access';
import { depositBtcRouteConfig } from './depositBtcRoutesConfig';

const DepositBtc = lazy(() =>
  import('./screens/DepositBtc').then(({ DepositBtc }) => ({
    default: DepositBtc,
  })),
);

const DepositStatus = lazy(() =>
  import('./screens/DepositStatus').then(({ DepositStatus }) => ({
    default: DepositStatus,
  })),
);

export function getDepositBtcRoutes(): JSX.Element {
  return (
    <>
      <Route
        element={
          <WalletGuard>
            <Suspense fallback={<QueryLoading isAbsolute />}>
              <DepositBtc />
            </Suspense>
          </WalletGuard>
        }
        path={depositBtcRouteConfig.main.path}
      />

      <Route
        element={
          <Suspense fallback={<QueryLoading isAbsolute />}>
            <DepositStatus />
          </Suspense>
        }
        path={depositBtcRouteConfig.status.path}
      />
    </>
  );
}
