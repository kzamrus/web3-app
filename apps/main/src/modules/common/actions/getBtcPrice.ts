import { getBtcPrice } from 'modules/api';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { web3Api } from 'store/web3Api';
import { featureConfig } from '../featureConfig';
import { sleep } from '../utils/sleep';

const DEMO_BTC_PRICE = 65000;

export const { useGetBtcPriceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBtcPrice: build.query<number, void>({
      queryFn: queryFnNotifyWrapper<void, never, number>(
        async () => {
          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: DEMO_BTC_PRICE };
          }

          return { data: await getBtcPrice() };
        },
        error => getExtendedErrorText(error, 'Unable to get BTC price'),
      ),
    }),
  }),
});
