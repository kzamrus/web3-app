import { OChainId, TChainId } from 'modules/api';
import { Address, TBitcoinNetwork } from 'modules/common/types';

type TNetwork = TChainId | TBitcoinNetwork;

export type TLinkType = 'tx' | 'address' | 'block';

const explorerLinks: Record<TNetwork, string> = {
  [OChainId.unsupported]: '',
  [OChainId.ethereum]: 'https://etherscan.io',
  [OChainId.holesky]: 'https://holesky.etherscan.io',
  [OChainId.mantle]: 'https://explorer.mantle.xyz',
  [OChainId.mantleSepolia]: 'https://sepolia.explorer.mantle.xyz',
  [OChainId.okxXLayer]: 'https://www.okx.com/explorer/xlayer',
  [OChainId.okxXLayerTestnet]: 'https://www.okx.com/explorer/xlayer-test',
  [OChainId.manta]: 'https://pacific-explorer.manta.network',
  [OChainId.scroll]: 'https://scrollscan.com',
  [OChainId.linea]: 'https://lineascan.build',
  [OChainId.lineaSepolia]: 'https://sepolia.lineascan.build',
  [OChainId.zircuit]: 'https://explorer.zircuit.com',

  bitcoin: 'https://lombard.mempool.space',
  bitcoinSignet: 'https://mempool.space/signet',
};

/**
 * Returns the link to the explorer for the given network.
 *
 * @param addr - The address or tx hash.
 * @param network - The network.
 * @param type - The type of link. Default is `tx`.
 *
 * @returns The link to the explorer.
 */
export function getExplorerLink(
  addr: Address,
  network: string | number,
  type: TLinkType = 'tx',
): string | undefined {
  const url = explorerLinks[network as TNetwork];

  if (!url) {
    return undefined;
  }

  return `${url}/${type}/${addr}`;
}
