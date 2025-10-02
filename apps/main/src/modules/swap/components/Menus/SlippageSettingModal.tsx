import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { OSlippageKey, TSlippageKey } from 'modules/swap/const';
import { useSlippageVariantModal } from '../../hooks/useSlippageVariantModal';
import { default as CloseIcon } from '../../icons/close-icon.svg?react';
import { SlippageBtn } from './SlippageBtn';
import { translation } from './translation';
import { useSlippageSettingStyles } from './useSlippageSettingStyles';

const slippageKeys = Object.keys(OSlippageKey) as TSlippageKey[];

export function SlippageSettingModal() {
  const { classes } = useSlippageSettingStyles();
  const { t, keys } = useTranslation(translation);
  const { isOpened, onClose } = useSlippageVariantModal();

  return (
    <Dialog open={isOpened} onClose={onClose} className={classes.modal}>
      <Typography
        variant="h1"
        id="alert-dialog-title"
        textAlign="center"
        className={classes.title}
      >
        {t(keys.slippageSettingTitle)}
      </Typography>

      <DialogContent className={classes.content}>
        <ButtonGroup
          className={classes.buttonGroup}
          variant="contained"
          aria-label="Basic button group"
        >
          {slippageKeys.map(slippageKey => (
            <SlippageBtn key={slippageKey} slippageKey={slippageKey} />
          ))}
        </ButtonGroup>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button variant="text" className={classes.closeBtn} onClick={onClose}>
          <CloseIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
