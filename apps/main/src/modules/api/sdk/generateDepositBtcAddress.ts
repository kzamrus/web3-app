import axios from 'axios';
import { getErrorMessage } from '../../common/utils/getErrorMessage';
import { getApiConfig } from '../apiConfig';
import { TChainId } from '../chainIDs';
import { getChainNameById } from './utils/getChainNameById';

const { baseApiUrl } = getApiConfig();

const ADDRESS_URL = 'api/v1/address';
export const SANCTIONED_ADDRESS = 'sanctioned_address';
const SANCTIONS_MESSAGE = 'destination address is under sanctions';

interface IGenerateNewAddressResponse {
  address: string;
}

/**
 * Generates a new deposit address for BTC.
 *
 * @param address EVM user address where LBTC will be claimed
 * @param chainId the chain ID
 * @param signature The signature of the message. It should be signed by the user's wallet.
 * @param referralId The referral ID
 *
 * @returns the new deposit address
 */
export async function generateDepositBtcAddress(
  address: string,
  chainId: TChainId,
  signature: string,
  referralId = '',
): Promise<string> {
  const toChain = getChainNameById(chainId);

  const params = {
    to_address: address,
    to_address_signature: signature,
    to_chain: toChain,
    referral_id: referralId,
    nonce: 0,
  };

  try {
    const { data } = await axios.post<IGenerateNewAddressResponse>(
      ADDRESS_URL,
      params,
      { baseURL: baseApiUrl },
    );

    return data.address;
  } catch (error) {
    const errorMsg = getErrorMessage(error);

    if (isSanctioned(errorMsg)) {
      return SANCTIONED_ADDRESS;
    } else {
      throw new Error(errorMsg);
    }
  }
}

function isSanctioned(errorMsg: string): boolean {
  return !!errorMsg.includes(SANCTIONS_MESSAGE);
}
