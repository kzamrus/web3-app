import { BoxProps, Button, Dialog, DialogActions } from '@mui/material';
import { useMobileTokenSelectStyles } from './useMobileTokenSelectStyles';
import { useCallback, useContext } from 'react';
import { TokenSelect } from './TokenSelect';
import { IUseSwap } from '../../hooks/useSwap';
import { default as CloseIcon } from '../../icons/close-icon.svg?react';
import { SwapFormContext } from './SwapForm';

interface IMobileTokenSelectProps extends Pick<BoxProps, 'sx' | 'children'> {
  useSwap: IUseSwap;
}

export function MobileTokenSelect({
  useSwap: useSwapHook,
}: IMobileTokenSelectProps): JSX.Element {
  const { classes } = useMobileTokenSelectStyles();
  const { setSrcSelectOpen, srcSelectOpen, setDstSelectOpen, dstSelectOpen } =
    useContext(SwapFormContext);

  const open = srcSelectOpen || dstSelectOpen;

  const onClose = useCallback(() => {
    setSrcSelectOpen(false);
    setDstSelectOpen(false);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.modal}
      >
        <TokenSelect useSwap={useSwapHook} />

        <DialogActions className={classes.actions}>
          <Button variant="text" className={classes.closeBtn} onClick={onClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
