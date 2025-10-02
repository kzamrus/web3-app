import { ETH_NETWORK_BY_ENV, getLbtcSupply } from 'modules/api';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { CommonCacheTags, web3Api } from 'store/web3Api';

const chainId = ETH_NETWORK_BY_ENV;
const demoTotalSupply = 33;

export const { useGetLbtcSupplyQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getLbtcSupply: build.query<number, void>({
      queryFn: queryFnNotifyWrapper<void, never, number>(
        async () => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: demoTotalSupply };
          }

          return {
            data: await getLbtcSupply(chainId),
          };
        },
        error => getExtendedErrorText(error, 'Unable to get LBTC supply'),
      ),
      providesTags: [CommonCacheTags.evmTokenBalance],
    }),
  }),
});
