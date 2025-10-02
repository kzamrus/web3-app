import { IS_PROD } from 'modules/common/const';
import { OChainId } from '../chainIDs';

export const SUPPORTED_CHAINS = IS_PROD
  ? [OChainId.ethereum]
  : [
      OChainId.ethereum, // test for 1inch integration
      OChainId.holesky,
      OChainId.scroll,
      OChainId.lineaSepolia,
      OChainId.zircuit,
      OChainId.okxXLayerTestnet,
      OChainId.mantleSepolia,
    ];
