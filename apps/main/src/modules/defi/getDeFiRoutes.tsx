import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { WalletGuard } from 'modules/early-access/index.ts';
import { defiRoutesConfig } from './defiRoutesConfig.ts';

const DeFi = lazy(() =>
  import('./screens/DeFi.tsx').then(({ DeFi }) => ({
    default: DeFi,
  })),
);

export function getDeFiRoutes(): JSX.Element {
  return (
    <>
      <Route
        element={
          <WalletGuard>
            <Suspense fallback={<QueryLoading isAbsolute />}>
              <DeFi />
            </Suspense>
          </WalletGuard>
        }
        path={defiRoutesConfig.main.path}
      />
    </>
  );
}
