import axios from 'axios';
import { subDays } from 'date-fns';
import { VAULT_CONTRACT } from '../const';

export type SevenSeasResponse = {
  Response: SevenSeasData[];
};

export type SevenSeasData = {
  block_number: number;
  daily_apy: number;
  price_usd: string;
  share_price: number;
  timestamp: string;
  total_assets: string;
  tvl: string;
  unix_seconds: string;
  vault_address: string;
};

export enum EVaultDailyPeriod {
  D7 = 7,
  D30 = 30,
}

const SEVEN_SEAS_CONRTACT_URL = `https://api.sevenseas.capital/dailyData/ethereum/${VAULT_CONTRACT}/`;

export async function getVaultDailyInfo(
  period: EVaultDailyPeriod,
): Promise<SevenSeasData[]> {
  const timestamp = getPeriodTimestamp(period);
  const url = `${SEVEN_SEAS_CONRTACT_URL}${timestamp}/latest`;
  const response = await axios.get<SevenSeasResponse>(url);

  return response.data['Response'];
}

function getPeriodTimestamp(period: EVaultDailyPeriod) {
  return Math.floor(subDays(new Date(), period).getTime() / 1000);
}
