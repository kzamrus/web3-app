import { Box, BoxProps, Paper, Skeleton, Typography } from '@mui/material';
import { ETH_NETWORK_BY_ENV, OLstToken, ONativeToken } from 'modules/api';
import { useConnection } from 'modules/auth';
import { useGetBtcPriceQuery } from 'modules/common/actions/getBtcPrice';
import { useGetLbtcBalanceQuery } from 'modules/common/actions/getLbtcBalance';
import { TextGradient } from 'modules/common/components/TextGradient';
import {
  ACTION_CACHE,
  ACTION_CACHE_LONG,
  DECIMAL_PLACES_BTC,
  USD_DECIMAL_PLACES,
  ZERO,
} from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { LbtcAmountMenu } from '../LbtcAmountMenu';
import { UnstakeBtn } from './UnstakeBtn';
import { translation } from './translation';
import { useLbtcAmountStyles } from './useLbtcAmountStyles';

const lstToken = OLstToken.LBTC;
const nativeToken = ONativeToken.BTC;

const DEFAULT_BTC_PRICE = 0;

export function LbtcAmount({ sx }: Pick<BoxProps, 'sx'>): JSX.Element {
  const { classes } = useLbtcAmountStyles();
  const { keys, t } = useTranslation(translation);
  const { isConnected } = useConnection();

  const { data: btcPriceInUsd = DEFAULT_BTC_PRICE } = useGetBtcPriceQuery(
    undefined,
    { refetchOnMountOrArgChange: ACTION_CACHE_LONG },
  );

  const { data: lbtcBalanceData, isLoading: isLbtcBalanceLoading } =
    useGetLbtcBalanceQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE,
      skip: !isConnected,
    });

  const chainId = ETH_NETWORK_BY_ENV;
  const balance =
    isConnected && lbtcBalanceData ? lbtcBalanceData.chains[chainId] : ZERO;
  const nativeTokenEquivalent = balance;
  const usdEquivalent = nativeTokenEquivalent.multipliedBy(btcPriceInUsd);

  const nativeTokenText = t('unit.tokenValue', {
    token: nativeToken,
    value: nativeTokenEquivalent.decimalPlaces(DECIMAL_PLACES_BTC).toFormat(),
  });

  const usdText = t('unit.usdValue', {
    value: usdEquivalent.decimalPlaces(USD_DECIMAL_PLACES).toFormat(),
  });

  return (
    <Paper className={classes.root} sx={sx}>
      <div className={classes.header}>
        <Typography variant="h3">{t(keys.title)}</Typography>

        <LbtcAmountMenu />
      </div>

      <div className={classes.footer}>
        <Box>
          <TextGradient sx={{ display: 'flex', gap: 1.5 }}>
            <Typography className={classes.amount}>
              {isLbtcBalanceLoading ? (
                <Skeleton width={50} />
              ) : (
                balance.decimalPlaces(DECIMAL_PLACES_BTC).toFormat()
              )}
            </Typography>

            <Typography className={classes.amountToken}>{lstToken}</Typography>
          </TextGradient>

          <Typography className={classes.amountInfo}>
            {`${nativeTokenText} | ${usdText}`}
          </Typography>
        </Box>

        <UnstakeBtn />
      </div>
    </Paper>
  );
}
