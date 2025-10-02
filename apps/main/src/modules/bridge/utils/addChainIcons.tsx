import { default as ScrollIcon } from '../icons/scroll-chain.svg?react';
import { default as MantleIcon } from '../icons/mantle-chain.svg?react';
import { default as LineaIcon } from '../icons/linea-chain.svg?react';
import { default as OKXIcon } from '../icons/okx-chain.svg?react';
import { default as ZircuitIcon } from '../icons/zircuit-chain.svg?react';
import { default as HoleskyIcon } from '../icons/eth-chain.svg?react';
import { SUPPORTED_CHAINS } from '../const';
import { BridgeChain } from '../types';

const iconsMap: {
  [x in BridgeChain]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  scroll: ScrollIcon,
  mantle: MantleIcon,
  mantleSepolia: MantleIcon,
  linea: LineaIcon,
  lineaSepolia: LineaIcon,
  okxXLayer: OKXIcon,
  okxXLayerTestnet: OKXIcon,
  zircuit: ZircuitIcon,
  holesky: HoleskyIcon,
  ethereum: HoleskyIcon,
};

export const SUPPORTED_CHAINS_WITH_ICONS = SUPPORTED_CHAINS.map(chain => ({
  ...chain,
  icon: iconsMap[chain.abbr],
}));
