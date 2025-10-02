import { Box, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { ACTION_CACHE_LONG, BTC_DECIMALS } from 'modules/common/const';
import { useDetectMobile } from 'modules/common/hooks/useDetectMobile';
import { useTranslation } from 'modules/i18n';
import { useGetVaultDailyInfoQuery } from 'modules/vault/actions/getVaultDailyInfo';
import { EVaultDailyPeriod } from 'modules/vault/api/getVaultDailyInfo';
import { useMemo, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PeriodSelect } from '../PeriodSelect';
import { translation } from './translation';
import { usePerformanceWidgetStyles } from './usePerformanceWidgetStyles';
import { getDate, getSum } from './utils';

export const PerformanceWidget = () => {
  const { classes } = usePerformanceWidgetStyles();
  const { t, keys } = useTranslation(translation);
  const [period, setPeriod] = useState(EVaultDailyPeriod.D7);
  const isMobile = useDetectMobile();

  const { data = [] } = useGetVaultDailyInfoQuery(period, {
    refetchOnMountOrArgChange: ACTION_CACHE_LONG,
  });

  const graphData = useMemo(
    () =>
      data.map(item => {
        const sum = getSum(item.price_usd, item.total_assets);

        const formattedSum = new BigNumber(sum)
          .decimalPlaces(BTC_DECIMALS)
          .toFormat();

        return {
          date: getDate(item.timestamp),
          BTC: formattedSum,
        };
      }),
    [data],
  );

  if (!graphData.length) {
    return null;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          width: {
            xs: '100%',
          },
          marginBottom: {
            xs: '12px',
          },
          justifyContent: 'space-between',
        }}
      >
        <Typography className={classes.title} component="h3">
          {t(keys.title)}
        </Typography>
        <PeriodSelect onChange={setPeriod} />
      </Box>
      <Box className={classes.paper}>
        <Box className={classes.container}>
          <ResponsiveContainer>
            <LineChart data={graphData}>
              <XAxis
                minTickGap={isMobile ? 5 : 20}
                tickMargin={isMobile ? 5 : 10}
                reversed
                axisLine={false}
                tickLine={false}
                dataKey="date"
                padding={{
                  left: 40,
                }}
              />
              {!isMobile && (
                <YAxis
                  padding={{
                    bottom: 25,
                  }}
                  style={{
                    fontSize: '14px',
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `${value} BTC`}
                />
              )}
              <Tooltip
                contentStyle={{
                  border: '1px solid transparent',
                  boxShadow:
                    '0px 0px 1px 0px rgba(0, 0, 0, 0.26), 0px 3px 8px 0px rgba(0, 0, 0, 0.06)',
                  borderRadius: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="BTC"
                strokeWidth={3}
                stroke="#60AFAF"
                dot={false}
                activeDot={{ r: 8, clipDot: true }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};
