import { ButtonBase, Dialog } from '@mui/material';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { QrCodeIcon } from 'modules/common/icons';
import { useDialog } from 'modules/dialogs';
import { QRCode } from 'react-qrcode-logo';
import logo from './bitcoin.png';
import { useQrCodeButtonStyles } from './useQrCodeButtonStyles';

interface ICopyButtonProps {
  address: string;
}

export function QrCodeButton({ address }: ICopyButtonProps): JSX.Element {
  const { isOpened, onClose, onOpen } = useDialog('qr-code');
  const { classes } = useQrCodeButtonStyles();

  return (
    <>
      <ButtonBase className={classes.button} onClick={onOpen}>
        <QrCodeIcon className={classes.icon} />
      </ButtonBase>

      <Dialog
        open={isOpened}
        onClose={onClose}
        sx={{
          '& .MuiDialog-paper': {
            padding: 0,
            overflow: 'visible',
            '& > canvas': { borderRadius: 'inherit' },
          },
        }}
      >
        <QRCode
          value={`bitcoin:${address}`}
          logoImage={logo}
          size={320}
          logoWidth={78}
          logoHeight={78}
        />

        <CloseBtn
          onClick={onClose}
          sx={{ top: { xs: -32, md: -8 }, right: { xs: -24, md: -40 } }}
        />
      </Dialog>
    </>
  );
}
