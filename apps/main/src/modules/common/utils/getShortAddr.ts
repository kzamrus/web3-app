/**
 * @param str The address to be shortened.
 * @param len The length of the address to be shortened. Default is `5`.
 * @returns The shortened address.
 *
 * @example
 * getShortAddr('0x1234567890abcdef1234567890abcdef12345678'); // '0x123...45678'
 */
export function getShortAddr(str?: string, len = 5): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (str.length <= 12) {
    return str;
  }

  return `${str.slice(0, len)}...${str.slice(-len)}`;
}
