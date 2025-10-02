import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    title: 'Stake BTC',
    selectNetwork: 'Select LBTC destination network',
    confirmAddress: 'Confirm LBTC destination address',
    confirmBtn: 'Confirm address',
    chooseMethod: 'Choose BTC stake method',
    addressConfirmed: 'Address confirmed',
    completeConfirm: 'Complete the second step to deposit',
    stakeDirectly: 'Stake directly',
    stakeDirectlyDescr: 'Minimum {minStake} BTC',
    stakeDirectlyTooltip: 'Send above {minStake} BTC to this address',
    connect: 'Connect',
    payWith: 'Pay with',
    comingSoon: 'Coming soon',
    feeTooltip: 'Lombard does not charge additional fees',

    exchangeRate: 'Exchange rate',
    stakingFee: 'Staking fee',
    confirmationTime: 'Confirmation time',
    confirmationTimeValue: '~{minutes} minutes ({blocks} blocks)',

    incentives: {
      title: 'Incentives',
      tooltip:
        'Your stake will earn Lombard Lux immediately, and minted LBTC can be used as collateral for lending, borrowing, and trading. Any additional partner incentives will be issued retrospectively. LBTC will earn a yield when Babylon delegates your stake to PoS networks in 2-3 months.',
      descr: 'Lombard Lux & Babylon incentives',
    },
  },
};
