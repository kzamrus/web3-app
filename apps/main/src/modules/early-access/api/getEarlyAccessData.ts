import axios from 'axios';
import { getApiConfig } from 'modules/api';

const { baseApiUrl } = getApiConfig();

export interface IEarlyAccessData {
  wallet?: string;
}

/**
 * Requests early access data by access code
 *
 * @param code - access code
 * @returns early access data
 */
export async function getEarlyAccessData(
  code: string,
): Promise<IEarlyAccessData> {
  const url = `api/v1/accesscode/${code}`;

  const { data } = await axios.get<IEarlyAccessData>(url, {
    baseURL: baseApiUrl,
  });

  return data;
}

export const demoSubmitCodeResponse: IEarlyAccessData = {
  wallet: '0x4D4959771a31334D85DAF25DAC562536332ce932',
};
