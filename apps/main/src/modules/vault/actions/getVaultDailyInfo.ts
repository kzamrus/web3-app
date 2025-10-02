import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';
import {
  EVaultDailyPeriod,
  getVaultDailyInfo,
  SevenSeasData,
} from '../api/getVaultDailyInfo';

export const { useGetVaultDailyInfoQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getVaultDailyInfo: build.query<SevenSeasData[], EVaultDailyPeriod>({
      queryFn: queryFnNotifyWrapper<EVaultDailyPeriod, never, SevenSeasData[]>(
        async period => {
          return {
            data: await getVaultDailyInfo(period),
          };
        },
        error => getExtendedErrorText(error, 'Failed to get vault daily info'),
      ),
    }),
  }),
});
