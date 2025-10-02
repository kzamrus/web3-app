import BigNumber from 'bignumber.js';
import { BridgeChain, Millisecond, SupportedChain } from './types';
import { OChainId, SUPPORTED_CHAINS as CHAINS } from 'modules/api';
import { capitalizeFirstLetter } from './utils/capitalizeFirstLetter';

export const DEMO_MAX = 3.125;
export const DEMO_FEE_RATE = 0.0002;
export const DEMO_GAS = 0.0078;
export const DEMO_TX_HASH = `0x123`;
export const DEMO_LBTC_PRICE = new BigNumber(69_243);

export const ACTION_POLLING_SHORT: Millisecond = 10000;

export const generateTxUrl: { [x: string]: (hash?: string) => string } = {
  holesky: hash => `https://holesky.etherscan.io/tx/${hash}`,
  scroll: hash => `https://sepolia.scrollscan.com/tx/${hash}`,
  mantle: hash => `https://mantlescan.xyz/tx/${hash}`,
  mantleSepolia: hash => `https://sepolia.mantlescan.xyz/tx/${hash}`,
  lineaSepolia: hash => `https://sepolia.lineascan.build/tx/${hash}`,
  zircuit: hash => `https://explorer.zircuit.com/tx/${hash}`,
  okxXLayer: hash => `https://www.okx.com/web3/explorer/tx/${hash}`,
  okxXLayerTestnet: hash =>
    `https://www.okx.com/web3/explorer/xlayer-test/tx/${hash}`,
};

export const SUPPORTED_CHAINS: SupportedChain[] = Object.entries(OChainId)
  .filter(([, id]) => CHAINS.includes(id as never))
  .map(([chain, id]) => ({
    abbr: chain as BridgeChain,
    name: capitalizeFirstLetter(chain),
    chainId: id,
  }));
