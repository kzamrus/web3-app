import BigNumber from 'bignumber.js';
import { BTC_DECIMALS } from 'modules/common/const';

export function amountDisplay(
  amount: BigNumber.Value,
  decimals = BTC_DECIMALS,
): string {
  const halfEvenBN = new BigNumber(amount).decimalPlaces(
    decimals,
    BigNumber.ROUND_HALF_EVEN,
  );

  if (halfEvenBN.isNaN()) {
    return '0';
  }

  const fixed = halfEvenBN.toFixed(decimals);

  const removedTrailZeros = fixed.replace(/\.?0+$/, '');
  return removedTrailZeros;
}
