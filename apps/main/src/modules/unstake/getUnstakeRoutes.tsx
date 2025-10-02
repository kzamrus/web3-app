import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { WalletGuard } from 'modules/early-access';
import { unstakeRoutesConfig } from './unstakeRoutesConfig';

const Unstake = lazy(() =>
  import('./screens/Unstake').then(({ Unstake }) => ({
    default: Unstake,
  })),
);

const UnstakeStatus = lazy(() =>
  import('./screens/UnstakeStatus').then(({ UnstakeStatus }) => ({
    default: UnstakeStatus,
  })),
);

export function getUnstakeRoutes(): JSX.Element {
  return (
    <>
      <Route
        element={
          <WalletGuard>
            <Suspense fallback={<QueryLoading isAbsolute />}>
              <Unstake />
            </Suspense>
          </WalletGuard>
        }
        path={unstakeRoutesConfig.main.path}
      />

      <Route
        element={
          <Suspense fallback={<QueryLoading isAbsolute />}>
            <UnstakeStatus />
          </Suspense>
        }
        path={unstakeRoutesConfig.status.path}
      />
    </>
  );
}
