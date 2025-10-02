import { OBtcWalletId } from 'modules/api';
import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    install: 'Install {wallet}',
    wallet: {
      [OBtcWalletId.Bitget]: 'Bitget Wallet',
      [OBtcWalletId.Xverse]: 'Xverse Wallet',
      [OBtcWalletId.Tomo]: 'Tomo Wallet',
      [OBtcWalletId.OKX]: 'OKX Wallet',
    },
  },
};
