import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CommonCacheTags, web3Api } from 'store/web3Api';

export function useResetCachedBalances(): void {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(
        web3Api.util.invalidateTags([
          CommonCacheTags.btcBalance,
          CommonCacheTags.lbtcBalance,
        ]),
      );
    };
  }, [dispatch]);
}
