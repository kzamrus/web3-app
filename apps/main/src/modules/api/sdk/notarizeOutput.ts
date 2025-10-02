import axios from 'axios';
import { fromHexToBase64 } from 'modules/common/utils/fromHexToBase64';
import { decodeParameters } from 'web3-eth-abi';
import { getApiConfig } from '../apiConfig';
import { getTxData } from '../btcProvider';
import { fromSatoshi } from '../utils/convertSatoshi';

const { baseApiUrl, thresholdKey } = getApiConfig();

interface INotarizeOutputParams {
  threshold_key: string;
  /** encoded to base64 hex of tx id */
  transaction_id: string;
  /** index of deposit output */
  output_index: number;
}

interface INotarizeOutputSuccess {
  notarized_transaction_output: {
    id: string;
    transaction_id: string;
    index: number;
    block_hash: string;
    value: string;
    address: string;
    threshold_key: string;
    proposal: string;
    payload: string;
    signature: string;
    raw_payload: string;
  };
}

export interface INotarizeOutput {
  rawPayload: string;
  proofSignature: string;
  amount: number;
  chainId: number;
}

/**
 * Notarize the output of a transaction.
 *
 * @param txHash - the hash of the transaction
 *
 * @returns the notarized output
 */
export async function notarizeOutput(txHash: string): Promise<INotarizeOutput> {
  const { vout } = await getTxData(txHash);

  if (!vout.length) {
    throw new Error('Transaction has no outputs');
  }

  // request notarization for all outputs
  const notarizeOutputPromises = vout.map((_, index) =>
    notarizeOutputByIndex(txHash, index),
  );

  let notarizeOutputResults: INotarizeOutput[] = [];

  // get any successful notarization
  for (const promise of notarizeOutputPromises) {
    try {
      const notarizeOutputResult = await promise;
      notarizeOutputResults.push(notarizeOutputResult);
    } catch (error) {}
  }

  const validNotarization = notarizeOutputResults.find(
    ({ amount }) => amount > 0,
  );

  if (!validNotarization) {
    throw new Error('No successful notarization');
  }

  return validNotarization;
}

export async function notarizeOutputByIndex(
  txHash: string,
  outputIndex: number,
): Promise<INotarizeOutput> {
  const txHashBase64 = fromHexToBase64(txHash);

  const params: INotarizeOutputParams = {
    threshold_key: thresholdKey,
    transaction_id: txHashBase64,
    output_index: outputIndex,
  };

  const { data } = await axios.post<INotarizeOutputSuccess>(
    `${baseApiUrl}/v1alpha/notarize/output`,
    params,
  );

  return mapResponse(data);
}

function mapResponse(data: INotarizeOutputSuccess): INotarizeOutput {
  const amount = fromSatoshi(data.notarized_transaction_output.value);

  const rawPayload = data.notarized_transaction_output.raw_payload;

  const chainId = +decodeChainId(rawPayload);

  return {
    rawPayload,
    proofSignature: data.notarized_transaction_output.signature,
    amount,
    chainId,
  };
}

function decodeChainId(rawData: string): string {
  try {
    let data = Buffer.from(rawData, 'base64');

    const result = decodeParameters(
      ['uint256', 'address', 'uint64'],
      `0x${data.toString('hex')}`,
    );

    return result[0] as string;
  } catch (error) {
    console.error('error decodeChainId', error);
    return rawData;
  }
}
