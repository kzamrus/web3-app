import { Button, ButtonBase, ClickAwayListener, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { useCopyClick } from 'modules/common/hooks/useCopyClick';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { useTranslation } from 'modules/i18n';

import { useBtcConnection, useConnection } from 'modules/auth';
import { WalletIcon } from 'modules/auth/components/WalletIcon';
import { CopyIcon, SuccessIcon } from 'modules/common/icons';
import { translation } from './translation';
import { useConnectedWalletStyles } from './useConnectedWalletStyles';

export function ConncectedWallet(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes, cx } = useConnectedWalletStyles();
  const { isCopied, handleCopy } = useCopyClick();
  const [open, setOpen] = useState(false);

  const { walletId, address = '', disconnect } = useConnection();

  const { isConnected: isBtcConnected, disconnect: btcDisconnect } =
    useBtcConnection();

  const shortAddr = useMemo(() => getShortAddr(address), [address]);
  const longAddr = useMemo(() => getShortAddr(address, 7), [address]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleDisconnectClick = () => {
    if (isBtcConnected) {
      btcDisconnect();
    }
    disconnect();
  };

  const tooltipContent = (
    <>
      <CopyToClipboard text={address} onCopy={handleCopy}>
        <ButtonBase
          className={classes.copyButton}
          title={isCopied ? t(keys.copied) : t(keys.copy)}
        >
          {longAddr}

          {isCopied ? (
            <SuccessIcon className={classes.copyIcon} />
          ) : (
            <CopyIcon className={classes.copyIcon} />
          )}
        </ButtonBase>
      </CopyToClipboard>

      <Button
        fullWidth
        className={classes.disconnectButton}
        variant="contained"
        color="secondary"
        onClick={handleDisconnectClick}
      >
        {t(keys.disconnect)}
      </Button>
    </>
  );

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          disableFocusListener
          disableHoverListener
          disableTouchListener
          arrow={false}
          classes={{ tooltip: classes.tooltipBox }}
          open={open}
          PopperProps={{ disablePortal: true }}
          title={tooltipContent}
          onClose={handleTooltipClose}
          placement="bottom-end"
        >
          <Button
            variant="contained"
            color="info"
            fullWidth
            className={cx(classes.root, open && classes.active)}
            onClick={handleTooltipOpen}
          >
            <WalletIcon wallet={walletId} className={classes.walletIcon} />

            {shortAddr}
          </Button>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}
