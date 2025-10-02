import { IDeposit } from 'modules/api';
import { useConnection } from 'modules/auth';
import { ACTION_CACHE } from 'modules/common/const';
import { useGetDepositsByAddressQuery } from 'modules/dashboard/actions/getDepositsByAddress';
import { selectOptimisticClaims } from 'modules/dashboard/store/dashboardSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface IUseActiveDeposits {
  activeDeposits: IDeposit[];
  isLoading: boolean;
}

export function useActiveDeposits(): IUseActiveDeposits {
  const { isConnected } = useConnection();
  const optimisticClaims = useSelector(selectOptimisticClaims);

  const { data: deposits = [], isLoading } = useGetDepositsByAddressQuery(
    undefined,
    {
      refetchOnMountOrArgChange: ACTION_CACHE,
      skip: !isConnected,
    },
  );

  const activeDeposits = useMemo(
    () =>
      deposits.filter(deposit => {
        const isOptimisticlyClaimed = optimisticClaims.some(
          claim => claim.txId === deposit.txid,
        );

        return !deposit.isClaimed && !isOptimisticlyClaimed;
      }),
    [deposits, optimisticClaims],
  );

  return { activeDeposits, isLoading };
}
