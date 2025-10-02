import { Box, Typography, Tooltip } from '@mui/material';
import { translation } from './translation';
import { useTranslation } from 'modules/i18n';
import { default as LogoIcon } from './assets/lombard.svg?react';
import { default as TipIcon } from './assets/icon-tip.svg?react';
import BigNumber from 'bignumber.js';
import { useConnection } from 'modules/auth';
import { usePointsStyles } from './usePointsStyle';
import { DECIMAL_PLACES_SHORT } from '../../../common/const.ts';
export function LombardPoints({ points }: { points: number }): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { isConnected } = useConnection();
  const { classes } = usePointsStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      className={classes.points}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 1,
        }}
      >
        <Box
          component={LogoIcon}
          sx={{
            flexShrink: 0,
            width: 22,
            height: 22,
            marginRight: 1,
          }}
        />
        <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: 1.25 }}>
          {t(keys.yourPoints)}
        </Typography>
        {isConnected && (
          <Tooltip title={t(keys.pointsTip)}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component={TipIcon}
                sx={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  marginLeft: 1,
                }}
              />
            </Box>
          </Tooltip>
        )}
      </Box>
      {isConnected && (
        <Typography sx={{ fontSize: 50, fontWeight: 600, lineHeight: 1.2 }}>
          {new BigNumber(points ?? 0)
            .decimalPlaces(DECIMAL_PLACES_SHORT)
            .toFormat()}
        </Typography>
      )}
      {!isConnected && <Box className={classes.emptyPoints} />}
    </Box>
  );
}
