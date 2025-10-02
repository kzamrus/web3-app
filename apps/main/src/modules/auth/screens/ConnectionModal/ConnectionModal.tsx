import { FormControlLabel } from '@mui/material';
import {
  ConnectDialog,
  ConnectDialogButtons,
  ConnectDialogTitle,
} from 'modules/auth/components/ConnectDialog';
import { useWalletConnectModal } from 'modules/auth/hooks/useConnectionModal';
import { Checkbox } from 'modules/common/components/Checkbox';
import { TERMS_OF_SERVICE_LINK } from 'modules/common/const';
import { featureConfig } from 'modules/common/featureConfig';
import { useTranslation } from 'modules/i18n';
import { useState } from 'react';
import { ConnectBitget } from './components/ConnectBitget';
import { ConnectMetamask } from './components/ConnectMetamask';
import { ConnectOKX } from './components/ConnectOKX';
import { ConnectTomo } from './components/ConnectTomo';
import { translation } from './translation';
import { useConnectionStyles } from './useConnectionStyles';
import { ConnectWalletConnect } from './components/ConnectWalletConnect';

export function ConnectionModal(): JSX.Element {
  const { isOpened, onClose } = useWalletConnectModal();
  const { keys, t } = useTranslation(translation);
  const { classes } = useConnectionStyles();

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const isConnectDisabled = !checked;

  return (
    <ConnectDialog open={isOpened} onClose={onClose}>
      <ConnectDialogTitle>{t(keys.title)}</ConnectDialogTitle>

      <FormControlLabel
        className={classes.checkbox}
        control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
        label={t(keys.tosText, { link: TERMS_OF_SERVICE_LINK }, true)}
      />

      <ConnectDialogButtons>
        <ConnectMetamask isDisabled={isConnectDisabled} />

        <ConnectWalletConnect isDisabled={isConnectDisabled} />

        <ConnectOKX isDisabled={isConnectDisabled} />

        {featureConfig.isEvmTomoWalletActive && (
          <ConnectTomo isDisabled={isConnectDisabled} />
        )}

        {featureConfig.isEvmBitgetWalletActive && (
          <ConnectBitget isDisabled={isConnectDisabled} />
        )}
      </ConnectDialogButtons>
    </ConnectDialog>
  );
}
