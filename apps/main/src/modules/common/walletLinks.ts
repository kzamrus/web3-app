import { DOWNLOAD_BITGET_URL, DOWNLOAD_OKX_URL } from '@ankr.com/provider';
import { OBtcWalletId, OEvmWalletId } from 'modules/api';

const DOWNLOAD_TOMO_URL = 'https://tomo.inc';

export const DOWNLOAD_WALLET_LINK = {
  [OBtcWalletId.Bitget]: DOWNLOAD_BITGET_URL,
  [OBtcWalletId.OKX]: DOWNLOAD_OKX_URL,
  [OBtcWalletId.Tomo]: DOWNLOAD_TOMO_URL,
  [OEvmWalletId.tomo]: DOWNLOAD_TOMO_URL,
  [OBtcWalletId.Xverse]: 'https://www.xverse.app/download',
};
