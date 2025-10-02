const hexRegex = /^[0-9a-fA-F]{64}$/;

export function validateBitcoinTxId(txId?: string): boolean {
  if (!txId) {
    return false;
  }
  return hexRegex.test(txId);
}
