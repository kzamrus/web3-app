import axios from 'axios';
import { getApiConfig } from 'modules/api';

const { baseApiUrl } = getApiConfig();

const url = 'api/v1/accesscode/wallet';

interface IRegisterWalletParams {
  wallet: string;
  code: string;
}

/**
 * Registers wallet by access code
 *
 * @param wallet - wallet address
 * @param code - access code
 *
 * @returns true if wallet was registered successfully
 */
export async function registerWallet(
  wallet: string,
  code: string,
): Promise<boolean> {
  const params: IRegisterWalletParams = {
    wallet,
    code,
  };

  await axios.post(url, params, {
    baseURL: baseApiUrl,
  });

  return true;
}
