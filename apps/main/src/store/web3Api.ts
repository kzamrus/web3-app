import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getUniqueId } from 'modules/common/utils/getUniqueId';

export const WalletCacheTags = {
  account: `account-${getUniqueId()}`,
};

export const CommonCacheTags = {
  btcBalance: `btcBalance-${getUniqueId()}`,
  evmTokenBalance: `evmTokenBalance-${getUniqueId()}`,
  lbtcBalance: `lbtcBalance-${getUniqueId()}`,
  lbtcAllowance: `lbtcAllowance-${getUniqueId()}`,
};

export const DashboardCacheTags = {
  deposits: `deposits-${getUniqueId()}`,
  unstakeHistory: `unstakeHistory-${getUniqueId()}`,
};

export const BridgeCacheTags = {
  bridgeFee: `bridgeFee-${getUniqueId()}`,
  bridgeAllowance: `bridgeAllowance-${getUniqueId()}`,
  bridgeData: `bridgeData-${getUniqueId()}`,
};

export const DepositCacheTags = {
  depositAddress: `depositAddress-${getUniqueId()}`,
};

export const EarlyAccessCacheTags = {
  accessData: `accessData-${getUniqueId()}`,
};

export const SwapCacheTags = {
  availableTokens: `availableTokens-${getUniqueId()}`,
  quote: `quote-${getUniqueId()}`,
  balance: `balance-${getUniqueId()}`,
  fee: `fee-${getUniqueId()}`,
  tokensWithBalance: `tokensWithBalance-${getUniqueId()}`,
  trustedRouter: `trustedRouter-${getUniqueId()}`,
};

export const web3Api = createApi({
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
  reducerPath: 'web3Api',
  tagTypes: [
    ...Object.values(WalletCacheTags),
    ...Object.values(CommonCacheTags),
    ...Object.values(DashboardCacheTags),
    ...Object.values(DepositCacheTags),
    ...Object.values(BridgeCacheTags),
    ...Object.values(EarlyAccessCacheTags),
    ...Object.values(SwapCacheTags),
  ],
});
