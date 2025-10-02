import axios from 'axios';
import { handleMempoolApiError } from './handleMempoolApiError';

interface IBtcPriceResponse {
  time: number;
  USD: number;
  EUR: number;
  GBP: number;
  CAD: number;
  CHF: number;
  AUD: number;
  JPY: number;
}

const url = 'https://mempool.space/api/v1/prices';

/**
 * @returns The current price of Bitcoin in USD.
 */
export async function getBtcPrice(): Promise<number> {
  try {
    const { data } = await axios.get<IBtcPriceResponse>(url);
    return data.USD;
  } catch (error) {
    handleMempoolApiError(error);
  }
}
