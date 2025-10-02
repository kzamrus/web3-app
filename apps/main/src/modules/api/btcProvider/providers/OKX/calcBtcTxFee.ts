const INPUT_BYTES = 148;
const OUTPUT_BYTES = 34;
const TX_BASE = 10;

/**
 * Calculate BTC transaction fee.
 *
 * @note based on https://medium.com/@oxapay/how-to-calculate-bitcoin-transaction-fees-what-businesses-need-to-know-about-bitcoin-e8463fbbb3b1
 *
 * @param inputs Number of inputs.
 * @param outputs Number of outputs.
 * @param feeRate Fee rate in satoshi.
 *
 * @returns Transaction fee.
 */
export function calcBtcTxFee(
  inputs: number,
  outputs: number,
  feeRate: number,
): number {
  return (inputs * INPUT_BYTES + outputs * OUTPUT_BYTES + TX_BASE) * feeRate;
}
