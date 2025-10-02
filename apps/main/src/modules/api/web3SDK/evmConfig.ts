import { CURRENT_ENV } from 'modules/common/const';
import { OChainId, TChainId } from '../chainIDs';
import { OLstToken, TLstToken } from '../tokens';

type TTokenAddress = {
  [key in TLstToken]: string;
};

export type NetworkConfig = TTokenAddress;

type TEvmConfig = {
  [key in TChainId]?: NetworkConfig;
};

const stageConfig: TEvmConfig = {
  [OChainId.holesky]: {
    [OLstToken.LBTC]: '0xED7bfd5C1790576105Af4649817f6d35A75CD818',
    [OLstToken.WBTC]: '',
  },
  [OChainId.ethereum]: {
    [OLstToken.LBTC]: '0x8236a87084f8b84306f72007f36f2618a5634494',
    [OLstToken.WBTC]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },
  [OChainId.scroll]: {
    [OLstToken.LBTC]: '0xea0f056059B895a7B29f6D78ADBC18485fC073f5',
    [OLstToken.WBTC]: '',
  },
  [OChainId.mantleSepolia]: {
    [OLstToken.LBTC]: '0xB7d14Db04A129F8F71b533c987B499768136fb25',
    [OLstToken.WBTC]: '',
  },
  [OChainId.zircuit]: {
    [OLstToken.LBTC]: '0x7921e5Cf2d8167514BbBC54DFF3b59A6c8e36b6d',
    [OLstToken.WBTC]: '',
  },
  [OChainId.lineaSepolia]: {
    [OLstToken.LBTC]: '0x91B534EE3618c8f62B8D6f4BB3967312C5bdE272',
    [OLstToken.WBTC]: '',
  },
  [OChainId.okxXLayer]: {
    [OLstToken.LBTC]: '0xB7d14Db04A129F8F71b533c987B499768136fb25',
    [OLstToken.WBTC]: '',
  },
  [OChainId.okxXLayerTestnet]: {
    [OLstToken.LBTC]: '0xB7d14Db04A129F8F71b533c987B499768136fb25',
    [OLstToken.WBTC]: '',
  },
};

const testnetConfig: TEvmConfig = {
  ...stageConfig,
  [OChainId.holesky]: {
    [OLstToken.LBTC]: '0x38A13AB20D15ffbE5A7312d2336EF1552580a4E2',
    [OLstToken.WBTC]: '',
  },
};

const prodConfig: TEvmConfig = {
  [OChainId.ethereum]: {
    [OLstToken.LBTC]: '0x8236a87084f8b84306f72007f36f2618a5634494',
    [OLstToken.WBTC]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },
};

export const getEvmConfig = (env = CURRENT_ENV): TEvmConfig => {
  switch (env) {
    case 'prod':
      return prodConfig;
    case 'testnet':
      return testnetConfig;
    default:
      return stageConfig;
  }
};
