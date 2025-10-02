import axios from 'axios';
import { SENTIO_API_KEY } from 'modules/common/const';
import { getSentioLombaPointsSql } from '../utils/getSentioQuerySql';

// TODO: Fetch it from API https://lombard-team.atlassian.net/browse/KAN-180
const DEFAULT_MULTIPLIER = 3;

interface LombaPointsData {
  result: {
    rows: {
      account: string;
      points_json: string;
    }[];
  };
}

interface IPoints {
  bpoints: number;
  lpoints: number;
  lbtc_balance: number;
  wbtc_balance: number;
  multiplier: number;
}

interface LombaPointJson {
  'lombard-holding-points-eth': IPoints;
  'lombard-uniswapv3-ethereum': IPoints;
  'lombard-curve-ethereum': IPoints;
}
export type GetLombaPointsFromSentioReturn = Awaited<
  ReturnType<typeof getLombaPointsFromSentio>
>;

export const getLombaPointsFromSentio = async (address: string) => {
  const url =
    'https://app.sentio.xyz/api/v1/analytics/lombard/lombard-holding-points-eth/sql/execute';
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
          'api-key': SENTIO_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    const { rows } = data.result;
    if (rows && rows[0]) {
      try {
        const data = JSON.parse(rows[0].points_json) as LombaPointJson;
        const points = Object.entries(data).reduce(
          (acc, item) => item[1].lpoints + acc,
          0,
        );

        const uniswapMultiplier =
          data['lombard-uniswapv3-ethereum']?.multiplier ?? DEFAULT_MULTIPLIER;
        const uniswapLBTCBalance =
          data['lombard-uniswapv3-ethereum']?.lbtc_balance ?? 0;
        const uniswapWBTCBalance =
          data['lombard-uniswapv3-ethereum']?.wbtc_balance ?? 0;

        const curveMultiplier =
          data['lombard-curve-ethereum']?.multiplier ?? DEFAULT_MULTIPLIER;
        const curveLBTCBalance =
          data['lombard-curve-ethereum']?.lbtc_balance ?? 0;
        const curveWBTCBalance =
          data['lombard-curve-ethereum']?.wbtc_balance ?? 0;

        return {
          points,
          uniswapMultiplier,
          uniswapLBTCBalance,
          uniswapWBTCBalance,
          curveMultiplier,
          curveLBTCBalance,
          curveWBTCBalance,
        };
      } catch (e) {
        throw new Error('Failed to parse lombard Lux json');
      }
    } else {
      return {
        points: 0,
        uniswapMultiplier: 0,
        uniswapLBTCBalance: 0,
        uniswapWBTCBalance: 0,
        curveMultiplier: 0,
        curveLBTCBalance: 0,
        curveWBTCBalance: 0,
      };
    }
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch lombard Lux from sentio');
  }
};
