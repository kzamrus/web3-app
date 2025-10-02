import { Box, Button, Typography } from '@mui/material';
import { useBoringVaultV1 } from 'boring-vault-ui';
import { getLombaPointsFromBff } from 'modules/api';
import { useConnection } from 'modules/auth';
import { useGetBtcPriceQuery } from 'modules/common/actions/getBtcPrice';
import { Ripple } from 'modules/common/components/Ripple';
import { ACTION_CACHE_LONG, DECIMAL_PLACES_SHORT } from 'modules/common/const';
import { useDetectMobile } from 'modules/common/hooks/useDetectMobile';
import { useTranslation } from 'modules/i18n';
import { vaultRoutesConfig } from 'modules/vault/vaultRoutesConfig';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { default as LombardPointsLogo } from './assets/lombardPointsLogo.svg?react';
import { translation } from './translation';
import { useMainWidgetStyles } from './useMainWidgetStyles';
import BigNumber from 'bignumber.js';

const formatToFixed = (value: number) => value.toFixed(2);

export function MainWidget() {
  const { t, keys } = useTranslation(translation);
  const { classes } = useMainWidgetStyles();
  const { address } = useConnection();
  const [userSharesBtc, setUserSharesBtc] = useState(0);
  const [shareValue, setShareValue] = useState(0);
  const [lombardPoints, setLombardPoinst] = useState(0);
  const [tvl, setTVL] = useState(0);
  const isMobile = useDetectMobile();

  const { data: btcPrice = 0 } = useGetBtcPriceQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_LONG,
  });

  const {
    fetchTotalAssets,
    fetchShareValue,
    isBoringV1ContextReady,
    fetchUserShares,
  } = useBoringVaultV1();

  useEffect(() => {
    async function getPoints() {
      if (!address) return;

      try {
        // todo: create action for this request
        const data = await getLombaPointsFromBff(address);

        setLombardPoinst(data.points);
      } catch (err) {
        console.log(err);
      }
    }

    getPoints();
  }, [address]);

  useEffect(() => {
    async function getTotalAssets() {
      try {
        if (!isBoringV1ContextReady) return;
        const assets = await fetchTotalAssets();
        setTVL(btcPrice * assets);
      } catch (err) {
        console.log(err);
      }
    }

    getTotalAssets();
  }, [btcPrice, isBoringV1ContextReady]);

  useEffect(() => {
    async function getShareValue() {
      try {
        if (!isBoringV1ContextReady) return;
        const value = await fetchShareValue();
        setShareValue(value);
      } catch (err) {
        console.log(err);
      }
    }

    getShareValue();
  }, [isBoringV1ContextReady]);

  useEffect(() => {
    async function getUserShares() {
      try {
        if (!isBoringV1ContextReady || !address) return;

        fetchUserShares(address).then(shares => {
          console.log('User shares: ', shares);

          const btcValue = shares * shareValue;
          setUserSharesBtc(btcValue); // BTC amount
          // USD amount
        });
      } catch (err) {
        console.log(err);
      }
    }

    getUserShares();
  }, [isBoringV1ContextReady, address, btcPrice, shareValue]);

  const userSharesUsdt = useMemo(
    () => userSharesBtc * btcPrice,
    [btcPrice, userSharesBtc],
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.titleWraper}>
        {!isMobile && (
          <Typography component="h2" className={classes.title}>
            {t(keys.title)}
          </Typography>
        )}

        <Box className={classes.badgesWrapper}>
          <Box className={classes.badge}>
            {t(keys.veda)} <span className={classes.badgeValue}>3x⚡</span>
          </Box>

          <Box className={classes.badge}>
            {t(keys.lux)} <span className={classes.badgeValue}>4x⚡</span>
          </Box>

          <Box className={classes.badge}>
            {t(keys.estimatedApy)}{' '}
            <span className={classes.badgeValue}>3%</span>
          </Box>

          <Box className={classes.badge}>
            {t(keys.tvl)}{' '}
            <span className={classes.badgeValue}>${tvl.toLocaleString()}</span>
          </Box>
        </Box>
      </Box>

      {isMobile && (
        <Typography component="h2" className={classes.title}>
          {t(keys.title)}
        </Typography>
      )}
      <Box className={classes.mainInfoWrapper}>
        <Box className={classes.btcInfoWrapper}>
          <Box className={classes.btcValueWrapper}>
            <Typography className={classes.btcValue}>
              {userSharesBtc}
            </Typography>

            <Typography className={classes.btcValueCurrency}>
              {t(keys.btc)}
            </Typography>
          </Box>

          <Typography className={classes.btcInfoUsdAmount}>
            {t(keys.usd)} {formatToFixed(userSharesUsdt)}
          </Typography>
        </Box>

        <Box className={classes.lombardPointsWrapper}>
          <Box className={classes.lombardPointsTitleWrapper}>
            <LombardPointsLogo className={classes.lombardPointsLogo} />
            <Typography className={classes.lombardPointsTitle}>
              {t(keys.lombardLux)}
            </Typography>
          </Box>

          <Typography className={classes.lombardPointsValue}>
            {new BigNumber(lombardPoints)
              .decimalPlaces(DECIMAL_PLACES_SHORT)
              .toFixed()}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.buttonsWrapper}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          className={classes.depositBtn}
          component={Link}
          to={vaultRoutesConfig.deposit.generatePath()}
        >
          {t(keys.depositBtn)}

          <Ripple />
        </Button>

        {userSharesBtc > 0 && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            className={classes.withdrawBtn}
            component={Link}
            to={vaultRoutesConfig.withdraw.generatePath()}
          >
            {t(keys.withdrawBtn)}

            <Ripple />
          </Button>
        )}
      </Box>
    </Box>
  );
}
