import { getCountryCode, isUkCountry } from 'modules/api';
import { web3Api } from 'store/web3Api';
import { featureConfig } from '../featureConfig';
import { sleep } from '../utils/sleep';
import axios from 'axios';
import packageJson from '../../../../package.json';
import { RESTRICTED_COUNTRIES_CODES } from '../const.ts';

export const { useGetAccessInfoQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAccessInfo: build.query<
      { isAccessAllowed: boolean; isDisclaimerRequired: boolean },
      void
    >({
      queryFn: async () => {
        const countryCode = await (async () => {
          try {
            if (featureConfig.offlineTesting) {
              await sleep();
              return 'GB';
            }

            return await getCountryCode();
          } catch (error) {
            const response = await axios.get(
              `${packageJson.homepage}/country.json`,
            );

            return response.headers['X-Country'];
          }
        })();

        return {
          data: {
            isAccessAllowed: !RESTRICTED_COUNTRIES_CODES.includes(countryCode),
            isDisclaimerRequired: isUkCountry(countryCode),
          },
        };
      },
    }),
  }),
});
