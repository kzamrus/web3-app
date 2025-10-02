import { EWalletId } from '@ankr.com/provider';
import { ReadProvider } from './ReadProvider';
import { WriteProvider } from './WriteProvider';

export const OProviderEvents = {
  accountsChanged: 'accountsChanged',
  disconnect: 'disconnect',
  message: 'message',
  chainChanged: 'chainChanged',
} as const;

export type TProviderEvents =
  (typeof OProviderEvents)[keyof typeof OProviderEvents];

export type TProvider = WriteProvider | ReadProvider;

export const OEvmWalletId = {
  ...EWalletId,
  tomo: 'tomo',
} as const;

export type TEvmWalletId = (typeof OEvmWalletId)[keyof typeof OEvmWalletId];
