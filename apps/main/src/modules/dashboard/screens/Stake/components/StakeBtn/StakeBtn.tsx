import { Button, ButtonProps } from '@mui/material';
import { useConnection, useWalletConnectModal } from 'modules/auth';
import { Ripple } from 'modules/common/components/Ripple';
import { depositBtcRouteConfig } from 'modules/deposit-btc';
import { useTranslation } from 'modules/i18n';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { translation } from './translation';

export function StakeBtn({ sx }: Pick<ButtonProps, 'sx'>): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { isConnected } = useConnection();
  const { onOpen } = useWalletConnectModal();

  const handleClick = useCallback(() => {
    if (!isConnected) {
      onOpen();
    }
  }, [isConnected, onOpen]);

  return (
    <Button
      fullWidth
      variant="contained"
      component={Link}
      to={depositBtcRouteConfig.main.generatePath()}
      size="large"
      sx={{ position: 'relative', display: 'flex', ...sx }}
      onClick={handleClick}
    >
      {t(keys.button)}

      <Ripple />
    </Button>
  );
}
