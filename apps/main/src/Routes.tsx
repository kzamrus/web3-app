import { JSX } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { getBridgeRoutes } from 'modules/bridge';
import { getClaimDepositsRoutes } from 'modules/claim-deposits';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { featureConfig } from 'modules/common/featureConfig';
import { getDashboardRoutes } from 'modules/dashboard';
import { getDeFiRoutes } from 'modules/defi';
import { getDepositBtcRoutes } from 'modules/deposit-btc';
import { getDevRoutes } from 'modules/dev';
import { DefaultLayout } from 'modules/layout';
import { getSwapRoutes } from 'modules/swap';
import { getUnstakeRoutes } from 'modules/unstake';
import { getVaultRoutes } from 'modules/vault';

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route
        element={
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
        }
      >
        {getDashboardRoutes()}

        {getDepositBtcRoutes()}

        {featureConfig.isSwapActive && getSwapRoutes()}

        {featureConfig.isBridgeAvailable && getBridgeRoutes()}

        {featureConfig.isDefiAvailable && getDeFiRoutes()}

        {featureConfig.isUnstakeAvailable && getUnstakeRoutes()}

        {featureConfig.isClaimByTxHashAvailable && getClaimDepositsRoutes()}

        {featureConfig.isVaultPageEnabled && getVaultRoutes()}

        {featureConfig.isDevUiEnabled && getDevRoutes()}

        <Route element={<PageNotFound />} path="*" />
      </Route>
    </Routes>
  );
}
