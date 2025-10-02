/**
 * Convert hex to base64
 *
 * @param data - hex string
 * @returns base64
 */
export function fromHexToBase64(data: string): string {
  if (data.startsWith('0x')) {
    data = data.slice(2);
  }
  return Buffer.from(data, 'hex').toString('base64');
}
