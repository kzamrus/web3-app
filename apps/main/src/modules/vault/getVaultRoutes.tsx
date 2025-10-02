import { ConnectionGuard } from 'modules/auth';
import { QueryLoading } from 'modules/common/components/QueryLoading';
import {
  GeoBlockingGuard,
  WalletGuard,
  WrongNetworkGuard,
} from 'modules/early-access';
import { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import { vaultRoutesConfig } from './vaultRoutesConfig';

// todo: remove connection guard and prepare screens to be available without connection

const Vault = lazy(() =>
  import('./screens/Vault').then(({ Vault }) => ({ default: Vault })),
);

const Withdraw = lazy(() =>
  import('./screens/Withdraw').then(({ Withdraw }) => ({
    default: Withdraw,
  })),
);

const WithdrawStatus = lazy(() =>
  import('./screens/WithdrawStatus').then(({ WithdrawStatus }) => ({
    default: WithdrawStatus,
  })),
);

const WithdrawCancel = lazy(() =>
  import('./screens/WithdrawCancel').then(({ WithdrawCancel }) => ({
    default: WithdrawCancel,
  })),
);

const Deposit = lazy(() =>
  import('./screens/Deposit').then(({ Deposit }) => ({
    default: Deposit,
  })),
);

const DepositStatus = lazy(() =>
  import('./screens/DepositStatus').then(({ DepositStatus }) => ({
    default: DepositStatus,
  })),
);

export function getVaultRoutes() {
  return (
    <>
      <Route
        element={
          <GeoBlockingGuard>
            <ConnectionGuard>
              <WalletGuard>
                <WrongNetworkGuard>
                  <Suspense fallback={<QueryLoading isAbsolute />}>
                    <Vault />
                  </Suspense>
                </WrongNetworkGuard>
              </WalletGuard>
            </ConnectionGuard>
          </GeoBlockingGuard>
        }
        path={vaultRoutesConfig.main.path}
      />

      <Route
        element={
          <GeoBlockingGuard>
            <ConnectionGuard>
              <WalletGuard>
                <WrongNetworkGuard>
                  <Suspense fallback={<QueryLoading isAbsolute />}>
                    <Withdraw />
                  </Suspense>
                </WrongNetworkGuard>
              </WalletGuard>
            </ConnectionGuard>
          </GeoBlockingGuard>
        }
        path={vaultRoutesConfig.withdraw.path}
      />
      <Route
        element={
          <GeoBlockingGuard>
            <ConnectionGuard>
              <WrongNetworkGuard>
                <Suspense fallback={<QueryLoading isAbsolute />}>
                  <WithdrawStatus />
                </Suspense>
              </WrongNetworkGuard>
            </ConnectionGuard>
          </GeoBlockingGuard>
        }
        path={vaultRoutesConfig.withdrawStatus.path}
      />

      <Route
        element={
          <GeoBlockingGuard>
            <ConnectionGuard>
              <WalletGuard>
                <WrongNetworkGuard>
                  <Suspense fallback={<QueryLoading isAbsolute />}>
                    <Deposit />
                  </Suspense>
                </WrongNetworkGuard>
              </WalletGuard>
            </ConnectionGuard>
          </GeoBlockingGuard>
        }
        path={vaultRoutesConfig.deposit.path}
      />
      <Route
        element={
          <GeoBlockingGuard>
            <ConnectionGuard>
              <WrongNetworkGuard>
                <Suspense fallback={<QueryLoading isAbsolute />}>
                  <DepositStatus />
                </Suspense>
              </WrongNetworkGuard>
            </ConnectionGuard>
          </GeoBlockingGuard>
        }
        path={vaultRoutesConfig.depositStatus.path}
      />
      <Route
        element={
          <Suspense fallback={<QueryLoading isAbsolute />}>
            <GeoBlockingGuard>
              <ConnectionGuard>
                <WrongNetworkGuard>
                  <WithdrawCancel />
                </WrongNetworkGuard>
              </ConnectionGuard>
            </GeoBlockingGuard>
          </Suspense>
        }
        path={vaultRoutesConfig.withdrawCancel.path}
      />
    </>
  );
}
