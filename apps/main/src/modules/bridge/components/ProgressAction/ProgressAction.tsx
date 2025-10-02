import { Box, ButtonOwnProps } from '@mui/material';
import { useProgressActionStyles } from './useProgressActionStyles';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { Button } from 'modules/common/components/Button';
import { Ripple } from 'modules/common/components/Ripple';
import { useCallback, useState } from 'react';
import { TChainId, checkNetwork } from 'modules/api';
import { showNotification } from 'modules/notifications';
import { useDispatch } from 'react-redux';
import { changeProgress, reset } from 'modules/bridge/store/bridgeSlice';
import { ProgressStage } from 'modules/bridge/screens/BridgeInProgress/types';
import { useNavigate } from 'react-router-dom';
import { bridgeRoutesConfig } from 'modules/bridge/bridgeRoutesConfig';
import { useBridgeInProgress } from 'modules/bridge/screens/BridgeInProgress/useBridgeInProgress';
import { useWithdrawFromBridge } from 'modules/bridge/hooks/useWithdrawFromBridge';
import { useAddLbtcToken } from 'modules/bridge/hooks/useAddLbtcToken';
import { useConnection } from 'modules/auth';

export function ProgressAction({
  sx,
  stage,
}: Pick<ButtonOwnProps, 'sx'> & { stage: ProgressStage }): JSX.Element {
  const { classes, cx } = useProgressActionStyles({});
  const {
    features: { isAddTokenAvailable },
  } = useConnection();
  const { keys, t } = useTranslation(translation);
  const [isSwitching, setIsSwitching] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bridgeData, depositDone } = useBridgeInProgress({});
  const { txHash = '', chainId: fromChainId } =
    bridgeRoutesConfig.bridgeProgress.useParams();
  const { onAddToken, isLoading: isAddTokenLoading } = useAddLbtcToken();

  const {
    onWithdrawFromBridgeClick: onClaim,
    isWithdrawFromBridgeLoading: isClaiming,
  } = useWithdrawFromBridge({ txHash, chainId: Number(fromChainId) ?? 1 });

  const onSwitchChain = useCallback(async () => {
    if (!bridgeData) return;

    try {
      setIsSwitching(true);
      await checkNetwork(bridgeData?.chainId);
      showNotification({
        message: t(keys.switchSuccessful),
        variant: 'success',
      });
      dispatch(changeProgress({ progress: 'claim' }));
    } catch (error) {
      console.error(error);
      showNotification({
        message: t(keys.switchFailed),
        variant: 'error',
      });
    } finally {
      setIsSwitching(false);
    }
  }, [bridgeData, t, keys, changeProgress, checkNetwork]);

  const onClose = useCallback(() => {
    dispatch(reset());
    navigate(bridgeRoutesConfig.main.path);
  }, []);

  if (stage === 'claim') {
    return (
      <Button
        variant="contained"
        className={classes.blackbtn}
        isLoading={isClaiming}
        disabled={isClaiming}
        sx={sx}
        fullWidth
        onClick={onClaim}
      >
        {t(keys.claim)}

        <Ripple />
      </Button>
    );
  }

  if (stage === 'finish') {
    return (
      <Box className={cx(classes.root, classes.finished)} sx={sx}>
        <Button
          variant="contained"
          className={classes.blackbtn}
          isLoading={isAddTokenLoading}
          disabled={isAddTokenLoading || !isAddTokenAvailable}
          onClick={() => onAddToken(bridgeData?.chainId as TChainId)}
        >
          {t(keys.addLBTC)}

          <Ripple />
        </Button>
        <Button
          variant="contained"
          className={classes.turquoisebtn}
          onClick={onClose}
        >
          {t(keys.close)}

          <Ripple />
        </Button>
      </Box>
    );
  }

  return (
    <Button
      variant="contained"
      className={classes.blackbtn}
      isLoading={!depositDone || isSwitching}
      sx={sx}
      fullWidth
      onClick={onSwitchChain}
      disabled={!depositDone || isSwitching}
    >
      {depositDone ? t(keys.switch) : ''}

      <Ripple />
    </Button>
  );
}
