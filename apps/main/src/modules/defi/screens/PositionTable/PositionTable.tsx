import { Box } from '@mui/material';
import { useConnection } from 'modules/auth';

import { Head } from './Head';
import { TableRow } from './TableRow';
import { useRowCurve } from './hooks/useRowCurve';
import { useRowUniswap } from './hooks/useRowUniswap';
import { useStyles } from './useStyle';
import { useGetBtcPriceQuery } from '../../../common/actions/getBtcPrice.ts';
import { ACTION_CACHE_LONG } from '../../../common/const.ts';

const ENABLE_CURVE = false;

export function PositionTable(): JSX.Element {
  const { classes } = useStyles();
  const { isConnected, address } = useConnection();
  const { data: btcUsdPrice = 0 } = useGetBtcPriceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_LONG,
  });

  const rowUniswap = useRowUniswap(address);
  const rowCurve = useRowCurve(address);

  const commonProps = {
    isConnected,
    btcUsdPrice,
  };

  return (
    <Box className={classes.container}>
      <Head />

      <TableRow
        {...rowUniswap}
        {...commonProps}
        position={
          (rowUniswap.wBTCBalance + rowUniswap.LBTCBalance) * btcUsdPrice
        }
      />

      {ENABLE_CURVE && (
        <TableRow
          {...rowCurve}
          {...commonProps}
          position={(rowCurve.wBTCBalance + rowCurve.LBTCBalance) * btcUsdPrice}
        />
      )}
    </Box>
  );
}
