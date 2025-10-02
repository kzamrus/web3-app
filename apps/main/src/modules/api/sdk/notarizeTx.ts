import axios from 'axios';
import { fromHexToBase64 } from 'modules/common/utils/fromHexToBase64';
import { decodeParameters } from 'web3-eth-abi';
import { getApiConfig } from '../apiConfig';
import { fromSatoshi } from '../utils/convertSatoshi';

const { baseApiUrl, thresholdKey } = getApiConfig();

interface INotarizeTxParams {
  threshold_key: string;
  chain_id: number;
  /** encoded to base64 hex of tx id */
  transaction_hash: string;
}

interface INotarizeTxSuccess {
  notarized_transaction: {
    id: string;
    status: TxStatus;
    blockchain: string;
    transaction_hash: string;
    block_number: string;
    block_hash: string;
    transaction_index: string;
    receipt_hash: string;
    transferred_amount: string;
    chain_id: string;
    threshold_key: string;
    proposal: string;
    payload: string;
    signature: string;
    raw_payload: string;
  };
}

export type TxStatus =
  | 'NOTARIZED_TRANSACTION_STATUS_REPLACED'
  | 'NOTARIZED_TRANSACTION_STATUS_ORPHANED'
  | 'NOTARIZED_TRANSACTION_STATUS_REVERTED'
  | 'NOTARIZED_TRANSACTION_STATUS_CONFIRMED';

export interface INotarizeTx {
  rawPayload: string;
  proofSignature: string;
  amount: number;
  chainId: number;
  status: TxStatus;
}

export async function notarizeTx(
  txHash: string,
  chainId: number,
): Promise<INotarizeTx | null> {
  const txHashBase64 = fromHexToBase64(txHash);

  const params: INotarizeTxParams = {
    threshold_key: thresholdKey,
    transaction_hash: txHashBase64,
    chain_id: chainId,
  };

  try {
    const { data } = await axios.post<INotarizeTxSuccess>(
      `${baseApiUrl}/v1alpha/notarize/transaction`,
      params,
    );
    return mapResponse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function mapResponse(data: INotarizeTxSuccess): INotarizeTx {
  const amount = fromSatoshi(data.notarized_transaction.transferred_amount);

  const rawPayload = data.notarized_transaction.raw_payload;

  const chainId = +decodeChainId(rawPayload);

  return {
    rawPayload,
    proofSignature: data.notarized_transaction.signature,
    amount,
    chainId,
    status: data.notarized_transaction.status,
  };
}

function decodeChainId(rawData: string): string {
  try {
    let data = Buffer.from(rawData, 'base64');

    const result = decodeParameters(['uint256'], `0x${data.toString('hex')}`);

    return result[0]?.toString() as string;
  } catch (error) {
    console.error('error decodeChainId', error);
    return rawData;
  }
}
