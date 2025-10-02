import { ButtonOwnProps } from '@mui/material';
import { useConnectionCheckerStyles } from './useConnectionCheckerStyles';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { ReactNode } from 'react';
import { useConnection, useWalletConnectModal } from 'modules/auth';
import { Button } from 'modules/common/components/Button';
import { Ripple } from 'modules/common/components/Ripple';

export function ConnectionChecker({
  sx,
  children,
}: Pick<ButtonOwnProps, 'sx' | 'children'>): JSX.Element | ReactNode {
  const { classes } = useConnectionCheckerStyles({});
  const { keys, t } = useTranslation(translation);
  const { isConnected, isLoading } = useConnection();
  const { onOpen } = useWalletConnectModal();

  if (!isConnected) {
    return (
      <Button
        fullWidth
        variant="contained"
        className={classes.blackbtn}
        sx={sx}
        onClick={onOpen}
        isLoading={isLoading}
      >
        {t(keys.connect)}

        <Ripple />
      </Button>
    );
  }

  return children;
}
