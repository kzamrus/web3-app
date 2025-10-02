import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IOptimisticClaim,
  selectOptimisticClaims,
  setOptimisticClaims,
} from '../store/dashboardSlice';

const OPTIMISTIC_CLAIM_CACHE_MIN = 2;
const OPTIMISTIC_CLAIM_CACHE_MS = OPTIMISTIC_CLAIM_CACHE_MIN * 60 * 1000;

/**
 * Hook to update optimistic claims. It removes expired optimistic claims.
 */
export function useUpdateOptimisticClaims(): void {
  const dispatch = useDispatch();
  const optimisticClaims = useSelector(selectOptimisticClaims);

  useEffect(() => {
    if (!optimisticClaims.length) {
      return;
    }

    const updatedData = optimisticClaims.filter(isNotExpiredClaim);

    dispatch(setOptimisticClaims(updatedData));
  }, []);
}

function isNotExpiredClaim(claim: IOptimisticClaim): boolean {
  return Date.now() - claim.timestamp < OPTIMISTIC_CLAIM_CACHE_MS;
}
