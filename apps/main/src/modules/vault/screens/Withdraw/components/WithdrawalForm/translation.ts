import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    title: 'Withdraw from Vault',
    amountLabel: 'Vault amount',
    balanceText: 'Available',
    withdrawalFee: 'Withdrawal fee',
    securityFeeTooltip:
      'By proceeding with the withdrawal of your LBTC, you agree to a Network Security Fee',
    withdrawalTime: 'Withdrawal time',
    withdrawalTimeValue: '3 days',
    approveWithdrawalBtn: 'Approve Withdrawal',
    quote:
      'While in the withdrawal queue, you will not earn position yields, loyalty points, Lombard Lux or Veda points. Only one withdrawal may be initiated at a time. If your share value is lower than it was at the time you initiated the request, it will be unable to fulfill due to impermanent loss or market volatility. If this happens, please re-queue your withdrawal at the new rate.',
    statusFetchFailed: 'Faild to fetch withdrawal status',
  },
};
