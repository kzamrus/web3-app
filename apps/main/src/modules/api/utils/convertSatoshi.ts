import { SATOSHI_SCALE } from 'modules/common/const';

/**
 * Convert Satoshi to BTC
 * @param amount - Satoshi amount
 * @returns BTC amount
 */
export function fromSatoshi(amount: number | string) {
  return +amount / SATOSHI_SCALE;
}

/**
 * Convert BTC to Satoshi
 *
 * @param amount - BTC amount
 * @returns Satoshi amount
 */
export function toSatoshi(amount: number | string) {
  return Math.floor(+amount * SATOSHI_SCALE);
}
