import { Dialog, DialogProps } from '@mui/material';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { useConnectDialogStyles } from './useConnectDialogStyles';

interface IConnectDialogProps
  extends Omit<DialogProps, 'classes' | 'className' | 'scroll' | 'fullWidth'> {}

export function ConnectDialog({
  children,
  onClose,
  ...restProps
}: IConnectDialogProps): JSX.Element {
  const { classes } = useConnectDialogStyles();

  return (
    <Dialog
      {...restProps}
      fullWidth
      onClose={onClose}
      classes={{ paper: classes.paper }}
      scroll="body"
    >
      {children}

      <CloseBtn onClick={onClose as VoidFunction} />
    </Dialog>
  );
}
