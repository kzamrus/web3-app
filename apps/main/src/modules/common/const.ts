import BigNumber from 'bignumber.js';
import { Days, Seconds, TEnv } from './types';

export const ROOT_PATH = '/';

export const ACTION_CACHE: Seconds = 60;
export const ACTION_CACHE_LONG: Seconds = 600;

export const metaEnv = import.meta.env;
export const CURRENT_ENV = metaEnv.VITE_ENV as TEnv;
export const IS_PROD = CURRENT_ENV === 'prod';
export const IS_STAGE = CURRENT_ENV === 'stage' || !IS_PROD;
export const IS_LOCAL = metaEnv.VITE_IS_LOCAL === 'true';
export const SENTIO_API_KEY = metaEnv.VITE_SENTIO_API_KEY;

export const DECIMAL_PLACES_ZERO = 0;
export const DECIMAL_PLACES = 4;
export const USD_DECIMAL_PLACES = 2;
export const DECIMAL_PLACES_SHORT = 2;
export const DECIMAL_PLACES_BTC = 6;
export const ETH_DECIMALS = 18;
export const ETH_SCALE = 10 ** ETH_DECIMALS;
export const ERC20_TOKEN_DECIMALS = ETH_DECIMALS;
export const BTC_DECIMALS = 8;
export const SATOSHI_SCALE = 10 ** BTC_DECIMALS;

export const HUNDRED_PERCENT = 100;

export const ZERO = new BigNumber(0);
export const ONE = new BigNumber(1);

/**
 * Address of the zero account.
 * Can also be used as a placeholder for unknown addresses.
 */
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const WEBSITE_LINK = IS_PROD
  ? 'https://www.lombard.finance'
  : 'https://stage.lombard.finance';

export const TWITTER_LINK = 'https://x.com/lombard_finance';

export const TERMS_OF_SERVICE_LINK =
  'https://docs.lombard.finance/legals/terms-of-service';

export const POLICY_LINK = 'https://docs.lombard.finance/legals/privacy-policy';

export const UNSTAKE_INFO_LINK =
  'https://docs.lombard.finance/faq/lbtc-faq#can-i-withdraw-my-btc-from-lombard';

export const SUPPORT_EMAIL = 'support@lombard.finance';

export const UNSTAKING_PERIOD: Days = 7;
export const UNSTAKING_TEXT = `${UNSTAKING_PERIOD} days`;
export const SECURITY_FEE = new BigNumber(IS_PROD ? 0.0001 : 0.0002);

export const MIN_STAKE_AMOUNT = IS_PROD ? 0.0002 : 0.0001;
export const MIN_UNSTAKE_AMOUNT = SECURITY_FEE.plus(0.00002);

export const RESTRICTED_COUNTRIES_CODES = [
  'US',
  'CU',
  'IR',
  'SY',
  'KP',
  'VE',
  'BY',
  'RU',
];
