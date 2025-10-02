import { Button, Dialog, Typography } from '@mui/material';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { useSuccessfulAccessModal } from 'modules/early-access/hooks/useSuccessfulAccessModal';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useSuccessfulRegistrationStyles } from './useSuccessfulRegistrationStyles';

export function SuccessfulRegistration(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const { classes } = useSuccessfulRegistrationStyles();
  const { isOpened, onClose } = useSuccessfulAccessModal();

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      classes={{
        paper: classes.root,
      }}
    >
      <i className={classes.icon}>🎉</i>

      <Typography className={classes.title} variant="h1">
        {t(keys.title)}
      </Typography>

      <Typography>{t(keys.description)}</Typography>

      <Button
        fullWidth
        className={classes.button}
        variant="contained"
        color="secondary"
        size="large"
        onClick={onClose}
      >
        {t(keys.continue)}
      </Button>

      <CloseBtn onClick={onClose} />
    </Dialog>
  );
}
