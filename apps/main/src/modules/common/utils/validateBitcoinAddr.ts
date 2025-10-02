import { validate } from 'bitcoin-address-validation';

/**
 * Validate bitcoin address.
 *
 * @info does not support signet addresses
 *
 * @param address - bitcoin address
 *
 * @returns boolean
 */
export function validateBitcoinAddr(address: string): boolean {
  if (!address) {
    return false;
  }

  return validate(address);
}
