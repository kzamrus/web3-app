import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { bridgeRoutesConfig } from './bridgeRoutesConfig';

const Bridge = lazy(() =>
  import('./screens/Bridge.tsx').then(({ Bridge }) => ({
    default: Bridge,
  })),
);

const BridgeFinish = lazy(() =>
  import('./screens/BridgeFinish').then(({ BridgeFinish }) => ({
    default: BridgeFinish,
  })),
);

const BridgeInProgress = lazy(() =>
  import('./screens/BridgeInProgress').then(({ BridgeInProgress }) => ({
    default: BridgeInProgress,
  })),
);

export function getBridgeRoutes(): JSX.Element {
  return (
    <>
      <Route
        element={
          <Suspense fallback={<QueryLoading isAbsolute />}>
            <Bridge />
          </Suspense>
        }
        path={bridgeRoutesConfig.main.path}
      />
      <Route
        element={
          <Suspense fallback={<QueryLoading isAbsolute />}>
            <BridgeFinish />
          </Suspense>
        }
        path={bridgeRoutesConfig.bridgeFinish.path}
      />
      <Route
        element={
          <Suspense fallback={<QueryLoading isAbsolute />}>
            <BridgeInProgress />
          </Suspense>
        }
        path={bridgeRoutesConfig.bridgeProgress.path}
      />
    </>
  );
}
