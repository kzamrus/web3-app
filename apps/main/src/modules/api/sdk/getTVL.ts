import axios from 'axios';
import { getApiConfig } from '../apiConfig';

const { baseApiUrl } = getApiConfig();

interface ITVLResponse {
  total_btc: number;
}

const url = `${baseApiUrl}/api/v1/reserves/tvl`;

export async function getTVL(): Promise<number> {
  try {
    const { data } = await axios.get<ITVLResponse>(url);
    return data.total_btc;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch TVL');
  }
}
