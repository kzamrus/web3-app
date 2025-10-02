import { OBtcWalletId } from 'modules/api';
import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    title: 'Stake BTC',
    titleFull: 'Stake with {wallet}',
    amountLabel: 'Stake amount',
    button: 'Stake',
    youWillGet: 'You will recieve',
    connectBtcWallet: 'Connect BTC wallet',
    feeLabel: 'Staking fee',
    confirmationLabel: 'Confirmation time',
    confirmationText: '~{minutes} minutes ({blocks} blocks)',
    feeTooltip: 'Lombard does not charge additional fees',
    depositAddrError:
      'Please return to the previous step to get the deposit address',
    wallet: {
      [OBtcWalletId.OKX]: 'OKX',
      [OBtcWalletId.Bitget]: 'Bitget',
      [OBtcWalletId.Tomo]: 'Tomo',
      [OBtcWalletId.Xverse]: 'Xverse',
    },
    lockedBalance: 'Locked balance: {value} BTC',
    lockedBalanceDescr:
      'This balance is temporarily locked and will be available after the transaction is confirmed on the blockchain.',
  },
};
