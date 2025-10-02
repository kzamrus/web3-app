import { useConnection, useWalletConnectModal } from 'modules/auth';
import { Button } from 'modules/common/components/Button';
import { useTranslation } from 'modules/i18n';
import { translation } from '../../../DefaultLayout/components/Header/translation';
import { default as Icon } from './assets/arrow-right.svg?react';
import { useConnectBtnStyles } from './useConnectBtnStyles';

export function ConnectBtn(): JSX.Element {
  const { classes } = useConnectBtnStyles();
  const { keys, t } = useTranslation(translation);
  const { onOpen } = useWalletConnectModal();
  const { isLoading } = useConnection();

  return (
    <Button
      className={classes.root}
      variant="contained"
      color="info"
      onClick={onOpen}
      isLoading={isLoading}
      fullWidth
    >
      <Icon className={classes.icon} />

      {t(keys.connect)}
    </Button>
  );
}
