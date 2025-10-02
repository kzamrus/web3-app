import { TEvmWalletId } from 'modules/api';

const WALLET_ID_STORAGE_KEY = '___wallet_id';

/**
 * Save wallet id to local storage.
 *
 * @param walletId - wallet id.
 * @returns void.
 */
export function storeWalletId(walletId: TEvmWalletId): void {
  localStorage.setItem(WALLET_ID_STORAGE_KEY, walletId);
}

/**
 * Restore wallet id from local storage.
 *
 * @returns wallet id.
 */
export function restoreWalletId(): TEvmWalletId | undefined {
  return localStorage.getItem(WALLET_ID_STORAGE_KEY) as
    | TEvmWalletId
    | undefined;
}

/**
 * Remove wallet id from local storage.
 *
 * @returns void.
 */
export function removeStoredWalletId(): void {
  localStorage.removeItem(WALLET_ID_STORAGE_KEY);
}
