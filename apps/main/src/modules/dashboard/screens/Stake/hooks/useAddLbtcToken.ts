import { OLstToken, getValidChain } from 'modules/api';
import { useConnection } from 'modules/auth';
import { useAddTokenToWalletMutation } from 'modules/common/actions/addTokenToWallet';
import { useCallback } from 'react';

const token = OLstToken.LBTC;

interface IUseAddLbtcToken {
  isLoading: boolean;
  onAddToken: () => Promise<boolean>;
}

export function useAddLbtcToken(): IUseAddLbtcToken {
  const { chainId: currentChainId } = useConnection();
  const chainId = getValidChain(currentChainId);
  const [addToken, { isLoading }] = useAddTokenToWalletMutation();

  const onAddToken = useCallback(
    async () => await addToken({ token, chainId }).unwrap(),
    [chainId, addToken],
  );

  return {
    isLoading,
    onAddToken,
  };
}
