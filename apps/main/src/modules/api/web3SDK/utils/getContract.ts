import { TChainId } from '../../chainIDs';
import { TLstToken } from '../../tokens';
import { TProvider } from '../../web3Provider';
import { getTokenABI } from './getTokenABI';
import { getTokenAddress } from './getTokenAddress';

/**
 * Returns token contract by token name.
 *
 * @param provider - Web3 provider.
 * @param token - Token name.
 */
export function getTokenContract(provider: TProvider, token: TLstToken) {
  const tokenAddress = getTokenAddress(
    provider.currentChain as TChainId,
    token,
  );

  const abi = getTokenABI(token);

  const contract = provider.createContract(abi, tokenAddress);

  if (!contract.options.address) {
    throw new Error("`address` option isn't defined");
  }

  return contract as typeof contract & {
    options: typeof contract.options & { address: string };
  };
}
