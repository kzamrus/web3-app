import {
  TChainId,
  checkNetwork,
  getApiConfig,
  getWriteProvider,
  signMessage,
} from 'modules/api';
import { featureConfig } from 'modules/common/featureConfig';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { sleep } from 'modules/common/utils/sleep';
import { DepositCacheTags, web3Api } from 'store/web3Api';

type Args = TChainId;
type Result = string;

const DEMO_CONFIRMATION = 'demo_confirmation';

export const ADDRESS_CONFIRMATION_CACHE_KEY = 'addressConfirmation';
const { thresholdKey } = getApiConfig();

export const {
  useGetAddressConfirmationMutation,
  endpoints: { getAddressConfirmation },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAddressConfirmation: build.mutation<Result, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, Result>(
        async chainId => {
          await checkNetwork(chainId);

          if (featureConfig.offlineTesting) {
            await sleep();
            return { data: DEMO_CONFIRMATION };
          }

          const provider = await getWriteProvider();
          const message = `chainId: ${chainId}, thresholdKey: ${thresholdKey}`;
          const data = await signMessage(provider, message);

          return { data };
        },
        error =>
          getExtendedErrorText(error, 'Unable to get address confirmation.'),
      ),
      invalidatesTags: [DepositCacheTags.depositAddress],
    }),
  }),
});

export const selectAddressConfirmation = getAddressConfirmation.select({
  fixedCacheKey: ADDRESS_CONFIRMATION_CACHE_KEY,
  requestId: undefined,
});
