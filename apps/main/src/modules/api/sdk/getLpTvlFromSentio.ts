import axios from 'axios';
import { SENTIO_API_KEY } from 'modules/common/const';
import { OProtocol } from './const.ts';

const config = {
  [OProtocol.Uniswap]: {
    url: 'https://app.sentio.xyz/api/v1/insights/lombard/lombard-uniswapv3-info/query',
  },
  [OProtocol.Curve]: {
    url: 'https://app.sentio.xyz/api/v1/insights/lombard/lombard-curve-info/query',
  },
};

interface LpTvlResponseData {
  results: {
    matrix: {
      samples: {
        values: {
          timestamp: string;
          value: number;
        }[];
      }[];
      totalSamples: number;
    };
  }[];
}
export const getLpTvlFromSentio = async (
  protocol: OProtocol,
): Promise<number> => {
  const url = config[protocol].url;
  try {
    const { data }: { data: LpTvlResponseData } = await axios.post(
      url,
      {
        timeRange: {
          start: 'now-1M',
          end: 'now',
          step: 3600,
          timezone: 'Asia/Shanghai',
        },
        limit: 1,
        queries: [
          {
            metricsQuery: {
              query: 'tvl_gauge',
              alias: '',
              id: 'a',
              labelSelector: {},
              aggregate: null,
              functions: [],
              disabled: false,
            },
            dataSource: 'METRICS',
            sourceName: '',
          },
        ],
        formulas: [],
        cachePolicy: {
          noCache: false,
          cacheTtlSecs: 1339200,
          cacheRefreshTtlSecs: 43200,
        },
      },
      {
        headers: {
          'api-key': SENTIO_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );
    const totalSamples = data.results[0].matrix.totalSamples;
    const values = data.results[0].matrix.samples[totalSamples - 1].values;
    values.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
    const value = values[values.length - 1].value;

    return Number(value.toFixed(2));
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch tvl from sentio');
  }
};
