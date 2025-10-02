import { ACTION_CACHE_LONG } from 'modules/common/const';
import { featureConfig } from 'modules/common/featureConfig';
import { useGetEarlyAccessDataQuery } from '../actions/getEarlyAccessData';
import {
  ACCESS_CODE_CACHE_KEY,
  useSubmitCodeMutation,
} from '../actions/submitCode';
import { IEarlyAccessData } from '../api/getEarlyAccessData';

interface IUseAccessInfo {
  data?: IEarlyAccessData;
  isLoading: boolean;
  submitCode: (code: string) => void;
}

export function useAccessInfo(): IUseAccessInfo {
  const [submitCode, { isLoading: isSubmitLoading }] = useSubmitCodeMutation({
    fixedCacheKey: ACCESS_CODE_CACHE_KEY,
  });

  const { data: accessData, isFetching: isAccessDataLoading } =
    useGetEarlyAccessDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_LONG,
      skip: !featureConfig.accessGuard,
    });

  return {
    data: accessData ?? undefined,
    isLoading: isSubmitLoading || isAccessDataLoading,
    submitCode,
  };
}
