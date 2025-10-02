import { IDeposit } from 'modules/api';
import { useConnection } from 'modules/auth';
import { ACTION_CACHE } from 'modules/common/const';
import { useGetDepositsByAddressQuery } from 'modules/dashboard/actions/getDepositsByAddress';
import { selectOptimisticClaims } from 'modules/dashboard/store/dashboardSlice';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

interface IClaimedStakes {
  claimedStakes: IDeposit[];
  isLoading: boolean;
}

export function useClaimedStakes(): IClaimedStakes {
  const { isConnected } = useConnection();
  const optimisticClaims = useSelector(selectOptimisticClaims);

  const { data = [], isLoading } = useGetDepositsByAddressQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE,
    skip: !isConnected,
  });

  const isOptimisticlyClaimed = useCallback(
    (txId: string) => optimisticClaims.some(claim => claim.txId === txId),
    [optimisticClaims],
  );

  const claimedStakes = useMemo(() => {
    return data?.filter(el => el.isClaimed || isOptimisticlyClaimed(el.txid));
  }, [data, isOptimisticlyClaimed]);

  return {
    claimedStakes,
    isLoading,
  };
}
