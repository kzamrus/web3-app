import axios from 'axios';
import { SENTIO_API_KEY } from 'modules/common/const';

interface ResponseData {
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
export const getLpPositionFromSentio = async (address: string) => {
  const url =
    'https://app.sentio.xyz/api/v1/insights/lombard/lombard-uniswapv3-ethereum/query';
  try {
    const { data }: { data: ResponseData } = await axios.post(
      url,
      {
        timeRange: {
          start: 'now-30d',
          end: 'now',
          step: 3600,
          timezone: 'Asia/Shanghai',
        },
        limit: 20,
        queries: [
          {
            eventsQuery: {
              resource: {
                name: 'point_update',
                type: 'EVENTS',
              },
              alias: '',
              id: 'a',
              aggregation: {
                aggregateProperties: {
                  type: 'LAST',
                  propertyName: 'newLbtcBalance',
                },
              },
              selectorExpr: {
                logicExpr: {
                  operator: 'AND',
                  expressions: [
                    {
                      selector: {
                        key: 'account',
                        operator: 'EQ',
                        value: [
                          {
                            stringValue: address,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              groupBy: [],
              limit: 0,
              functions: [],
              disabled: true,
            },
            dataSource: 'EVENTS',
            sourceName: '',
          },
          {
            eventsQuery: {
              resource: {
                name: 'point_update',
                type: 'EVENTS',
              },
              alias: '',
              id: 'b',
              aggregation: {
                aggregateProperties: {
                  type: 'LAST',
                  propertyName: 'newWbtcBalance',
                },
              },
              selectorExpr: {
                logicExpr: {
                  operator: 'AND',
                  expressions: [
                    {
                      selector: {
                        key: 'account',
                        operator: 'EQ',
                        value: [
                          {
                            stringValue: address,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              groupBy: [],
              limit: 0,
              functions: [],
              disabled: true,
            },
            dataSource: 'EVENTS',
            sourceName: '',
          },
          {
            metricsQuery: {
              query: 'a2b_price',
              alias: '',
              id: 'c',
              labelSelector: {},
              aggregate: null,
              functions: [],
              disabled: true,
            },
            dataSource: 'METRICS',
            sourceName: 'lombard-uniswapv3-info',
          },
          {
            priceQuery: {
              id: 'd',
              alias: '',
              coinId: [
                {
                  symbol: 'WBTC',
                },
              ],
              disabled: true,
            },
            dataSource: 'PRICE',
            sourceName: '',
          },
        ],
        formulas: [
          {
            expression: 'a*d/sum(c)+b*d',
            alias: 'lp_position',
            id: 'A',
            disabled: false,
            functions: [],
          },
        ],
        cachePolicy: {
          noCache: false,
          cacheTtlSecs: 1296000,
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
    return Number(value).toFixed(4);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch lp position from sentio');
  }
};
