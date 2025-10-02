import { OLstToken, TLstToken } from '../../tokens';
import { IERC20, LBTCABI } from '../abi';

export function getTokenABI(token: TLstToken) {
  switch (token) {
    case OLstToken.LBTC:
      return LBTCABI;
    default:
      return IERC20;
  }
}
