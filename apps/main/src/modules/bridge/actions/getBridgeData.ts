import BigNumber from 'bignumber.js';
import { OLstToken, TChainId } from 'modules/api';
import { fromSatoshi } from 'modules/api/utils/convertSatoshi';
import { decodeLog } from 'modules/api/web3SDK/decodeLog';
import { getTokenABI } from 'modules/api/web3SDK/utils/getTokenABI';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { BridgeCacheTags, web3Api } from 'store/web3Api';
import { TransactionReceiptAPI } from 'web3-types';
import { DepositToBridgeData } from '../types';
import { t } from 'modules/i18n';

type Args = {
  txReceipt: TransactionReceiptAPI;
  chainId: TChainId;
};

const DEPOSIT_EVENT_INDEX = 2; // Index of DepositToBridge event on Contract
const DEPOSIT_EVENT_NAME = 'DepositToBridge';

export const { useGetBridgeDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBridgeData: build.query<DepositToBridgeData, Args>({
      queryFn: queryFnNotifyWrapper<Args, never, DepositToBridgeData>(
        async ({ txReceipt, chainId }) => {
          const decodedData = await decodeLog({
            logs: txReceipt.logs,
            eventIndex: DEPOSIT_EVENT_INDEX,
            abi: getTokenABI(OLstToken.LBTC),
            eventName: DEPOSIT_EVENT_NAME,
            chainId: chainId as TChainId,
          });
          if (!decodedData) {
            return { error: 'Unable to decode receipt' };
          }
          return {
            data: {
              chainId: Number(decodedData['chainId']) as TChainId,
              fromToken: decodedData['fromToken'],
              toToken: decodedData['toToken'],
              totalAmount: new BigNumber(
                fromSatoshi(decodedData['totalAmount']?.toString() as string),
              ),
            },
          };
        },
        error => getExtendedErrorText(error, t('requestError.getBridgeData')),
      ),
      providesTags: [BridgeCacheTags.bridgeData],
    }),
  }),
});
