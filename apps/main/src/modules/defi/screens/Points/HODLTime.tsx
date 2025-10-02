import { Box, Typography } from '@mui/material';
import { translation } from './translation';
import { useTranslation } from 'modules/i18n';
import { default as HODLIcon } from './assets/hold_time.svg?react';
import { default as FlashIcon } from './assets/flashIocn.svg?react';
import { useConnection } from 'modules/auth';
import {
  useGetHoldTimeFromSentioQuery,
  useGetAvgHoldTimeFromSentioQuery,
} from '../actions/getHoldingTimeFromSentio';
import {
  formatHoldingTimeDisplay,
  formatCompareAvgHoldingTimeDisplayHours,
} from '../utils';
import { useMemo } from 'react';
export function HODLTime(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { isConnected, address } = useConnection();
  const { data: holdTime } = useGetHoldTimeFromSentioQuery({
    address,
  });
  const { data: avgHoldTime } = useGetAvgHoldTimeFromSentioQuery(null);

  const holdTimeDisplay = useMemo(() => {
    const data = formatHoldingTimeDisplay(holdTime ?? 0);
    return `${data?.[0] ?? 0} days, ${data?.[1] ?? 0}h, ${data?.[2] ?? 0}m`;
  }, [holdTime]);

  const avgHoldTimeDisplay = useMemo(() => {
    const data = formatHoldingTimeDisplay(avgHoldTime ?? 0);
    return `${data?.[0] ?? 0} days, ${data?.[1] ?? 0}h, ${data?.[2] ?? 0}m`;
  }, [avgHoldTime]);

  const compareAvgHoldTimeDisplayHours = useMemo(() => {
    if (holdTime && avgHoldTime) {
      return formatCompareAvgHoldingTimeDisplayHours(holdTime, avgHoldTime);
    }
  }, [holdTime, avgHoldTime]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 1,
        }}
      >
        <Box
          component={HODLIcon}
          sx={{
            flexShrink: 0,
            width: 22,
            height: 22,
            marginRight: 1,
          }}
        />
        <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: 1.25 }}>
          {isConnected ? t(keys.holdTime) : t(keys.avgHoldTime)}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 24, fontWeight: 600, lineHeight: 1.25 }}>
        {isConnected ? holdTimeDisplay : avgHoldTimeDisplay}
      </Typography>
      {isConnected && compareAvgHoldTimeDisplayHours && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 1,
          }}
        >
          <Box
            component={FlashIcon}
            sx={{
              flexShrink: 0,
              width: 8,
              height: 12,
              marginRight: 1,
            }}
          />

          <Typography sx={{ fontSize: 13, fontWeight: 400, lineHeight: 1.25 }}>
            {Math.abs(compareAvgHoldTimeDisplayHours)} hours{' '}
            {compareAvgHoldTimeDisplayHours > 0
              ? t(keys.timeThanAvg)
              : t(keys.timeLessThanAvg)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
