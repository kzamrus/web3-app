import { OLstToken, TChainId } from 'modules/api';
import { useAddTokenToWalletMutation } from 'modules/common/actions/addTokenToWallet';
import { useCallback } from 'react';

const token = OLstToken.LBTC;

interface IUseAddLbtcToken {
  isLoading: boolean;
  onAddToken: (chainId: TChainId) => Promise<boolean>;
}

export function useAddLbtcToken(): IUseAddLbtcToken {
  const [addToken, { isLoading }] = useAddTokenToWalletMutation();

  const onAddToken = useCallback(
    async (chainId: TChainId) => await addToken({ token, chainId }).unwrap(),
    [addToken],
  );

  return {
    isLoading,
    onAddToken,
  };
}
