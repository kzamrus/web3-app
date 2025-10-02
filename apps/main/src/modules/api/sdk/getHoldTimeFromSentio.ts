import axios from 'axios';
import { SENTIO_API_KEY } from 'modules/common/const';
import {
  getSentioHoldTimeSql,
  getAvgHoldingTimeSql,
} from '../utils/getSentioQuerySql';
interface HoldTimeData {
  result: {
    rows: {
      account: string;
      holding_time: number;
    }[];
  };
}

export const getHoldTimeFromSentio = async (address: string) => {
  const url =
    'https://app.sentio.xyz/api/v1/analytics/lombard/lombard-holding-points-eth/sql/execute';
  const sql = getSentioHoldTimeSql(address);
  try {
    const { data }: { data: HoldTimeData } = await axios.post(
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
    // console.log('res: ', data);
    const { rows } = data.result;
    const accountData = rows[0];
    if (!accountData) {
      return 0;
    } else {
      return accountData.holding_time;
    }
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const getAvgHoldTimeFromSentio = async () => {
  const url =
    'https://app.sentio.xyz/api/v1/analytics/lombard/lombard-holding-points-eth/sql/execute';
  const sql = getAvgHoldingTimeSql();
  try {
    const { data }: { data: HoldTimeData } = await axios.post(
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
    console.log('res: ', data);
    const { rows } = data.result;
    const accountData = rows[0];
    if (!accountData) {
      return 0;
    } else {
      return accountData.holding_time;
    }
  } catch (e) {
    console.error(e);
    return 0;
  }
};
