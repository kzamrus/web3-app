import axios from 'axios';
import { getSentioLombaPointsSql } from '../utils/getSentioQuerySql';

interface LombaPointsData {
  result: {
    rows: {
      account: string;
      points_json: string;
    }[];
  };
}

interface LombaPointJson {
  'lombard-holding-points-eth': {
    bpoints: number;
    lpoints: number;
    lbtc_balance: number;
    multiplier: number;
  };
  'lombard-uniswapv3-ethereum': {
    bpoints: number;
    lpoints: number;
    lbtc_balance: number;
    multiplier: number;
  };
  'lombard-lbtcv-ethereum': {
    bpoints: number;
    lpoints: number;
    lbtc_balance: number;
    multiplier: number;
  };
}

export const getLombaPointsFromBff = async (address: string) => {
  const url =
    'https://bff.stage.lombard.finance/sentio-api/proxy/analytics/lombard/lombard-holding-points-eth/sql/execute';
  const sql = getSentioLombaPointsSql(address);
  try {
    const { data }: { data: LombaPointsData } = await axios.post(
      url,
      {
        sqlQuery: {
          sql,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('data.result', data.result);

    const { rows } = data.result;
    if (rows && rows[0]) {
      try {
        const data = JSON.parse(rows[0].points_json) as LombaPointJson;

        const points = data['lombard-lbtcv-ethereum']?.lpoints ?? 0;

        return {
          points,
        };
      } catch (e) {
        throw new Error('Failed to parse lombard Lux json');
      }
    } else {
      return { points: 0 };
    }
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch lombard Lux from sentio');
  }
};
