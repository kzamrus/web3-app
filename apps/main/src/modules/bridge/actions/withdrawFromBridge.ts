import { getWriteProvider, withdrawFromBridge } from 'modules/api';
import { web3Api } from 'store/web3Api';

import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { notarizeTx } from 'modules/api/sdk/notarizeTx';
import Web3 from 'web3';
import * as rlp from 'rlp';
import { t } from 'modules/i18n';
import { TransactionReceiptAPI } from 'web3-types';

type Args = {
  txHash: string;
  chainId: number;
  receipt: TransactionReceiptAPI;
};

function encodeTransactionReceipt(txReceipt: TransactionReceiptAPI) {
  const rlpLogs = txReceipt.logs.map(log => {
    return [
      log.address,
      log.topics,
      Buffer.from((log.data as string).substr(2), 'hex'),
    ];
  });
  const rlpReceipt = [
    Web3.utils.numberToHex(Number(txReceipt.status)),
    Web3.utils.numberToHex(txReceipt.cumulativeGasUsed),
    rlpLogs,
  ];
  return Web3.utils.bytesToHex(rlp.encode(rlpReceipt));
}

export const { useWithdrawFromBridgeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    withdrawFromBridge: build.mutation<string, Args>({
      queryFn: queryFnNotifyWrapper<Args, void, string>(
        async ({ chainId, txHash, receipt }) => {
          const result = await notarizeTx(txHash, chainId);

          if (!result) return { data: null };

          const { rawPayload, proofSignature } = result;

          // modify signature
          const signature = Buffer.from(proofSignature, 'base64');
          signature[signature.length - 1] += 27;
          const modifiedSignature = '0x' + signature.toString('hex');

          const encodedReceipt = encodeTransactionReceipt(receipt);

          const provider = await getWriteProvider();

          const { transactionHash, receiptPromise } = await withdrawFromBridge(
            provider,
            {
              rawPayload:
                '0x' + Buffer.from(rawPayload, 'base64').toString('hex'),
              rawReceipt: encodedReceipt,
              proofSignature: modifiedSignature,
            },
          );
          const claimReceipt = await receiptPromise;
          if (claimReceipt?.status) {
            return { data: transactionHash };
          } else {
            throw new Error(t('requestError.withdrawFromBridge'));
          }
        },
        error =>
          getExtendedErrorText(error, t('requestError.withdrawFromBridge')),
      ),
    }),
  }),
});
