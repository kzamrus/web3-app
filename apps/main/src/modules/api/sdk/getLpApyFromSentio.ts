import axios from 'axios';
import { SENTIO_API_KEY } from 'modules/common/const';

interface LpApyResponseData {
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
export const getLpApyFromSentio = async () => {
  const url =
    'https://app.sentio.xyz/api/v1/insights/lombard/lombard-uniswapv3-info/query';
  try {
    const { data }: { data: LpApyResponseData } = await axios.post(
      url,
      {
        timeRange: {
          start: 'now-30d',
          end: 'now',
          step: 3600,
          timezone: 'Asia/Shanghai',
        },
        limit: 1,
        queries: [
          {
            metricsQuery: {
              query: 'swap_gauge',
              alias: '',
              id: 'a',
              labelSelector: {},
              aggregate: null,
              functions: [
                {
                  name: 'sum_over_time',
                  arguments: [
                    {
                      durationValue: {
                        value: 24,
                        unit: 'h',
                      },
                    },
                  ],
                },
              ],
              disabled: true,
            },
            dataSource: 'METRICS',
            sourceName: '',
          },
          {
            metricsQuery: {
              query: 'tvl_gauge',
              alias: '',
              id: 'b',
              labelSelector: {},
              aggregate: null,
              functions: [],
              disabled: true,
            },
            dataSource: 'METRICS',
            sourceName: '',
          },
        ],
        formulas: [
          {
            expression: 'a*0.0005*365/b',
            alias: 'APY',
            id: 'A',
            disabled: false,
            functions: [],
          },
        ],
        cachePolicy: {
          noCache: false,
          cacheTtlSecs: 1296000,
          cacheRefreshTtlSecs: 1800,
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
    return Number(value).toFixed(4);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch tvl from sentio');
  }
};
