import { ButtonOwnProps } from '@mui/material';
import { useSendActionStyles } from './useSendActionStyles';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { Button } from 'modules/common/components/Button';
import { Ripple } from 'modules/common/components/Ripple';

export function SendAction({
  sx,
  type,
  isSending,
  invalidChain,
  isSwitching,
}: Pick<ButtonOwnProps, 'sx'> &
  Pick<HTMLButtonElement, 'type'> & {
    isSending: boolean;
    invalidChain: boolean;
    isSwitching: boolean;
  }): JSX.Element {
  const { classes } = useSendActionStyles({});
  const { keys, t } = useTranslation(translation);

  if (invalidChain) {
    return (
      <Button
        variant="contained"
        className={classes.blackbtn}
        type={type}
        sx={sx}
        fullWidth
        isLoading={isSwitching}
        disabled={isSwitching}
      >
        {t(keys.switchChain)}

        <Ripple />
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        className={classes.blackbtn}
        disabled={isSending}
        isLoading={isSending}
        type={type}
        sx={sx}
        fullWidth
      >
        {t(keys.send)}

        <Ripple />
      </Button>
    );
  }
}
