import { IWeb3SendResult } from '@ankr.com/provider';
import { getErrorMessage } from 'modules/common/utils/getErrorMessage';
import { OLstToken } from '../tokens';
import { WriteProvider } from '../web3Provider';
import { getTokenContract } from './utils/getContract';
import { getGasMultiplier } from './utils/getGasMultiplier';

const INSUFFICIENT_FUNDS_PARTIAL_ERROR = 'insufficient funds';
const INSUFFICIENT_FUNDS_ERROR = 'Insufficient funds for transfer';

/**
 * Claims LBTC.
 *
 * @docs https://taguslabs.atlassian.net/wiki/spaces/SP/pages/211058714/Deposit+integration+flow
 *
 * @param provider - Web3 provider.
 * @param data - raw payload from deposit notarization
 * @param proofSignature - signature from deposit notarization
 * @param withDecoding - flag to decode data from base64 to hex
 *
 * @returns transaction promise
 */
export async function claimLBTC(
  provider: WriteProvider,
  data: string,
  proofSignature: string,
  withDecoding?: boolean,
): Promise<IWeb3SendResult> {
  const tokenContract = getTokenContract(provider, OLstToken.LBTC);

  const [hexData, hexSignature] = withDecoding
    ? decodeData(data, proofSignature)
    : [data, proofSignature];

  const tx = tokenContract.methods.mint(hexData, hexSignature);

  try {
    const result = await provider.sendTransactionAsync(
      provider.currentAccount,
      tokenContract.options.address,
      {
        data: tx.encodeABI(),
        estimate: true,
        estimateFee: true,
        gasLimitMultiplier: getGasMultiplier(provider.currentChain),
      },
    );

    return result;
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage.includes(INSUFFICIENT_FUNDS_PARTIAL_ERROR)) {
      throw new Error(INSUFFICIENT_FUNDS_ERROR);
    }

    throw new Error(errorMessage);
  }
}

function decodeData(rawPayload: string, proofSignature: string): string[] {
  const dataBase64 = Buffer.from(rawPayload, 'base64');

  let signatureBase64 = Buffer.from(proofSignature, 'base64');
  signatureBase64[signatureBase64.length - 1] += 27;

  const hexData = `0x${dataBase64.toString('hex')}`;
  const hexSignature = `0x${signatureBase64.toString('hex')}`;

  return [hexData, hexSignature];
}
