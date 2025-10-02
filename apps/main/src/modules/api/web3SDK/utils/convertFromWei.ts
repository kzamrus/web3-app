import BigNumber from 'bignumber.js';

import { ETH_SCALE } from 'modules/common/const';

export const convertFromWei = (
  amount: BigNumber.Value,
  scale = ETH_SCALE,
): BigNumber => {
  const bnAmount = new BigNumber(amount);

  return bnAmount.isZero() ? bnAmount : bnAmount.dividedBy(scale);
};
