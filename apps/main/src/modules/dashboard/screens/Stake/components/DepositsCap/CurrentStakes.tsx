import { Skeleton, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { ONativeToken } from 'modules/api';
import { useGetBtcPriceQuery } from 'modules/common/actions/getBtcPrice';
import {
  ACTION_CACHE,
  ACTION_CACHE_LONG,
  DECIMAL_PLACES_SHORT,
  DECIMAL_PLACES_ZERO,
} from 'modules/common/const';
import { useGetLbtcSupplyQuery } from 'modules/dashboard/actions/getLbtcSupply';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useDepositsCapStyles } from './useDepositsCapStyles';

export function CurrentStakes(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useDepositsCapStyles();

  const { data: btcPrice = 0 } = useGetBtcPriceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_LONG,
  });

  const { data: currentSupply = 0, isLoading: isCurrentSupplyLoading } =
    useGetLbtcSupplyQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE,
    });

  const isLoading = isCurrentSupplyLoading;

  const currentStakeUsdText = t('unit.usdValue', {
    value: new BigNumber(currentSupply)
      .multipliedBy(btcPrice)
      .decimalPlaces(DECIMAL_PLACES_ZERO)
      .toFormat(),
  });

  const currentSupplyText = t('unit.tokenValue', {
    value: new BigNumber(currentSupply)
      .decimalPlaces(DECIMAL_PLACES_SHORT)
      .toFormat(),
    token: ONativeToken.BTC,
  });

  return (
    <Typography className={classes.progressInfo}>
      {t(keys.currentStakes)}

      <span className={classes.progressValue}>
        {isLoading ? (
          <Skeleton width={90} />
        ) : (
          <>
            {currentSupplyText}

            <span className={classes.progressValueDivider} />

            {currentStakeUsdText}
          </>
        )}
      </span>
    </Typography>
  );
}
