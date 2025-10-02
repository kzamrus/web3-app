import { toSatoshi } from 'modules/api/utils/convertSatoshi';
import {
  ErrorJSONRPCResponse,
  SuccessJSONRPCResponse,
} from '../../common/types';
import { TNetworkMode } from '../../types';
import { getInjectedXverseBtcProvider } from './getInjectedBtcProvider';

const USER_REJECTION_CODE = -32000;

interface ISendTxResult {
  txid: string;
}

/**
 * Send a transaction to the specified address.
 *
 * @docs https://docs.xverse.app/sats-connect/bitcoin-methods/sendtransfer
 *
 * @param networkMode - The network mode.
 * @param to - The address to send the transaction to.
 * @param amount - The amount to send.
 *
 * @returns The transaction ID.
 */
export async function sendTx(
  networkMode: TNetworkMode,
  to: string,
  amount: string,
): Promise<string> {
  if (networkMode === 'testnet') {
    throw new Error('Not implemented for testnet');
  }

  const injectedProvider = getInjectedXverseBtcProvider();

  const transferParams = {
    recipients: [
      {
        address: to,
        amount: toSatoshi(amount),
      },
    ],
  };

  try {
    const response: SuccessJSONRPCResponse<ISendTxResult> =
      await injectedProvider.request('sendTransfer', transferParams);

    return response.result.txid;
  } catch (error) {
    const err = error as ErrorJSONRPCResponse['error'];

    if (err?.code === USER_REJECTION_CODE) {
      throw new Error('User cancelled the transaction');
    } else {
      console.error(err);
      throw new Error(err.message);
    }
  }
}
