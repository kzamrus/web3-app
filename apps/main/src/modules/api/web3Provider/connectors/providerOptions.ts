import { providerDefaultOptions } from '@ankr.com/provider';
import { OEvmWalletId } from '../types';
import { tomoConnector } from './tomoConnector';

export const providerOptions: typeof providerDefaultOptions = {
  ...providerDefaultOptions,
  [OEvmWalletId.tomo]: {
    connector: tomoConnector,
  },
};
