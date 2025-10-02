import axios from 'axios';
import { getApiConfig } from '../apiConfig';
import { TChainId } from '../chainIDs';
import { TChainName } from './types';
import { getChainNameById } from './utils/getChainNameById';

const { baseApiUrl } = getApiConfig();

const ADDRESS_URL = 'api/v1/address';

interface IDepositAddress {
  btc_address: string;
  created_at: string;
  deprecated?: boolean;
  type: string;
  used?: boolean;
  deposit_metadata: {
    to_address: string;
    to_blockchain: TChainName;
  };
}

interface IDepositAddressesResponse {
  addresses: IDepositAddress[];
  has_more?: boolean;
}

/**
 * Returns the address for depositing BTC.
 *
 * @param address EVM user address where LBTC will be claimed
 * @param chainId the chain ID
 *
 * @returns the address for depositing BTC
 */
export async function getDepositBtcAddress(
  address: string,
  chainId: TChainId,
): Promise<string> {
  const addresses = await getDepositBtcAddresses(address, chainId);

  const addressData = getActualAddress(addresses);

  if (!addressData) {
    throw new Error('No address');
  }

  return addressData.btc_address;
}

/**
 * Retrieves the actual deposit address from a list of deposit addresses.
 *
 * @param addresses - The list of deposit addresses.
 * @returns The actual deposit address or undefined if the last created address is deprecated.
 */
function getActualAddress(
  addresses: IDepositAddress[],
): IDepositAddress | undefined {
  const actualAddress = addresses.reduce((acc, address) => {
    if (acc.created_at < address.created_at) {
      return address;
    }
    return acc;
  });

  return actualAddress.deprecated ? undefined : actualAddress;
}

/**
 * Requests the deposit addresses for the given user address.
 *
 * @param address EVM user address where LBTC will be claimed
 * @param chainId the chain ID
 *
 * @returns the deposit addresses
 */
export async function getDepositBtcAddresses(
  address: string,
  chainId: TChainId,
): Promise<IDepositAddress[]> {
  const toBlockchain = getChainNameById(chainId);

  const params = {
    to_address: address,
    to_blockchain: toBlockchain,
    limit: 1,
    offset: 0,
    asc: false,
  };

  const { data } = await axios.get<IDepositAddressesResponse>(ADDRESS_URL, {
    baseURL: baseApiUrl,
    params,
  });

  return data.addresses;
}
