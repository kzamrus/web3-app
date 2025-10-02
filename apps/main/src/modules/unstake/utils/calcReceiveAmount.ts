import BigNumber from 'bignumber.js';
import { SECURITY_FEE, ZERO } from 'modules/common/const';

const defaultReceiveAmount = ZERO;

/**
 * Calculate receive amount
 *
 * @param amount - amount
 *
 * @returns receive amount
 */
export function calcReceiveAmount(amount: BigNumber.Value): BigNumber {
  if (!amount) {
    return defaultReceiveAmount;
  }

  if (SECURITY_FEE.isGreaterThan(amount)) {
    return defaultReceiveAmount;
  }

  return new BigNumber(amount).minus(SECURITY_FEE);
}
