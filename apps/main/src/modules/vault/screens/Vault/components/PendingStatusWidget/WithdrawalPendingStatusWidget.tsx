import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { default as LBTCe } from '../../assets/LBTCe.svg?react';
import { translation } from './translation';
import { useWithdrawalPendingStatusWidgetStyles } from './useWithdrawalPendingStatusWidgetStyles';
import { Button } from 'modules/common/components/Button';
import { useTimer } from './useTimer';
import { InfoIconWithTooltip } from 'modules/common/components/InfoIconWithTooltip';
import { useNavigate } from 'react-router-dom';
import { vaultRoutesConfig } from 'modules/vault/vaultRoutesConfig';
import { useTokenOut } from './useTokenOut';

export const WithdrawalPendingStatusWidget = () => {
  const { classes } = useWithdrawalPendingStatusWidgetStyles();
  const { t, keys } = useTranslation(translation);

  const { data: tokenOutInfo, isLoading: isLoadingTokenOut } = useTokenOut();

  const navigate = useNavigate();

  const handleCancelWithdraw = () => {
    navigate(vaultRoutesConfig.withdrawCancel.generatePath());
  };

  const { sharesWithdrawing, deadlineUnixSeconds, minSharePrice } =
    tokenOutInfo || {};

  const timer = useTimer(deadlineUnixSeconds);

  if (isLoadingTokenOut) {
    return (
      <Box className={classes.root}>
        <Typography className={classes.title} component="h3">
          {t(keys.title)}
        </Typography>
        <Box className={classes.paper}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  if (!tokenOutInfo) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} component="h3">
        {t(keys.title)}
      </Typography>
      <Box className={classes.paper}>
        <Box className={classes.container}>
          <Box className={classes.step}>
            <Typography className={classes.subtitle}>
              {t(keys.text1)}
              <InfoIconWithTooltip placement="top">
                {t(keys.tooltip1)}
              </InfoIconWithTooltip>
            </Typography>
            <Box className={classes.row}>
              <LBTCe />
              <Typography className={classes.value}>
                {sharesWithdrawing}
              </Typography>
              <Typography className={classes.value}>{t(keys.lbtcv)}</Typography>
            </Box>
          </Box>
          <Box className={classes.step}>
            <Typography className={classes.subtitle}>
              {t(keys.text2)}
              <InfoIconWithTooltip placement="top">
                {t(keys.tooltip2)}
              </InfoIconWithTooltip>
            </Typography>
            <Box className={classes.row}>
              <LBTCe />
              <Typography className={classes.value}>
                {sharesWithdrawing}
              </Typography>
              <Typography className={classes.value}>{t(keys.lbtc)}</Typography>
            </Box>
          </Box>
          <Box className={classes.step}>
            <Typography className={classes.subtitle}>
              {t(keys.text3)}
              <InfoIconWithTooltip placement="top">
                {t(keys.tooltip3)}
              </InfoIconWithTooltip>
            </Typography>
            <Box className={classes.row}>
              <Typography className={classes.value}>{minSharePrice}</Typography>
              <Typography className={classes.value}>{t(keys.lbtc)}</Typography>
            </Box>
          </Box>
          <Box className={classes.step}>
            <Typography className={classes.subtitle}>
              {t(keys.text4)}
              <InfoIconWithTooltip placement="top">
                {t(keys.tooltip4)}
              </InfoIconWithTooltip>
            </Typography>
            <Box className={classes.row}>
              <Typography className={classes.value}>{timer}</Typography>
            </Box>
          </Box>
          <Box className={classes.step}>
            <Box className={classes.lastStep}>
              <Button onClick={handleCancelWithdraw} className={classes.button}>
                {t(keys.button)}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
