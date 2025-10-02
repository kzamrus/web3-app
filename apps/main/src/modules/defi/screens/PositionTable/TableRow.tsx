import { Box, IconButton, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { TChainId } from 'modules/api';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { ProtocolIcon } from 'modules/defi/components/ProtocolIcon';
import { globalTranslation, useTranslation } from 'modules/i18n';
import PlusIcon from './assets/plus.svg?react';
import { translation } from './translation';
import { useStyles } from './useStyle';
import { DECIMAL_PLACES_SHORT } from '../../../common/const.ts';

const positionPlaceholder = '—';

export interface ITableRowProps {
  asset: string;
  isConnected: boolean;
  chainId: TChainId;
  multiplier: number;
  wBTCBalance: number;
  LBTCBalance: number;
  poolLink: string;
  position: number;
  protocolName: string;
  protocolIcon: string | React.FC;
  tvl: number;
}

export function TableRow({
  asset,
  isConnected,
  chainId,
  multiplier,
  poolLink,
  position,
  protocolName,
  protocolIcon,
  tvl,
}: ITableRowProps): JSX.Element {
  const { classes } = useStyles();
  const { keys } = useTranslation(translation);
  const { keys: globalKeys, t } = useTranslation(globalTranslation);

  const positionText = t(globalKeys.unit.usdValue, {
    value: new BigNumber(position)
      .decimalPlaces(DECIMAL_PLACES_SHORT)
      .toFormat(),
  });

  const tvlText = t(globalKeys.unit.usdValue, {
    value: new BigNumber(tvl).toFormat(),
  });

  return (
    <Box className={classes.row}>
      <Box className={classes.cell} flex={4}>
        <Typography>{t(keys.assetsOn, { asset })}</Typography>

        <div className={classes.protocol}>
          <ProtocolIcon
            icon={protocolIcon}
            sx={{
              height: 24,
              width: 24,
            }}
          />

          {protocolName}
        </div>
      </Box>

      <Box className={classes.cell} flex={2}>
        <Box className={classes.netowrk}>
          <NetworkIcon sx={{ fontSize: 28 }} chainId={chainId} />

          <Typography sx={{ ml: 1 }}>{t(globalKeys.chain[chainId])}</Typography>
        </Box>
      </Box>

      <Box className={classes.cell} flex={2}>
        {multiplier ? (
          <Typography className={classes.multiplier}>
            {t(keys.multiplierValue, { value: multiplier })}
          </Typography>
        ) : (
          <Box className={classes.multiplierEmpty}></Box>
        )}
      </Box>

      <Box className={classes.cell} flex={2}>
        <Typography>{tvlText}</Typography>
      </Box>

      <Box className={classes.cell} flex={2}>
        <Typography>
          {isConnected ? positionText : positionPlaceholder}
        </Typography>
      </Box>

      <Box className={classes.cell} width={40}>
        <IconButton
          className={classes.addButton}
          href={poolLink}
          target="_blank"
          rel="norefferer"
        >
          <PlusIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
