import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import { QueryLoading } from 'modules/common/components/QueryLoading';
import { WalletGuard } from 'modules/early-access/index.ts';
import { swapRoutesConfig } from './swapRoutesConfig.ts';

const Swap = lazy(() =>
  import('./screens/Swap.tsx').then(({ Swap }) => ({
    default: Swap,
  })),
);

export function getSwapRoutes(): JSX.Element {
  return (
    <>
      <Route
        element={
          <WalletGuard>
            <Suspense fallback={<QueryLoading isAbsolute />}>
              <Swap />
            </Suspense>
          </WalletGuard>
        }
        path={swapRoutesConfig.main.path}
      />
    </>
  );
}
