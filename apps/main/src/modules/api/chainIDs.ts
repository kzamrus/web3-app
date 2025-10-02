export const OChainId = {
  unsupported: 0,
  ethereum: 1,
  holesky: 17000,
  mantle: 5000,
  mantleSepolia: 5003,
  okxXLayer: 196,
  okxXLayerTestnet: 195,
  manta: 169,
  scroll: 534351,
  lineaSepolia: 59141,
  linea: 59140,
  zircuit: 48899,
} as const;

export type TChainId = (typeof OChainId)[keyof typeof OChainId];
