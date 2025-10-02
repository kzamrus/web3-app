import { Box, Button, Dialog } from '@mui/material';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { useModal } from 'modules/common/hooks/useModal';
import { InfoIcon } from 'modules/common/icons';
import { useTranslation } from 'modules/i18n';
import { RestrictedModal } from '../RestrictedModal/RestrictedModal';
import { translation } from './translation';

export function RestrictedInfo(): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const { isOpened, onOpen, onClose } = useModal();

  return (
    <>
      <Button
        onClick={onOpen}
        sx={{
          color: 'error.main',
          lineHeight: 1,
          gap: 0.75,
          gridColumn: { xs: '1 / -1', md: 'initial' },
        }}
      >
        <Box component={InfoIcon} sx={{ width: 16, height: 16 }} />

        <span>{t(keys.restrictedDeposit)}</span>
      </Button>

      <Dialog
        maxWidth={false}
        open={isOpened}
        onClose={onClose}
        PaperProps={{ sx: { p: 0 } }}
      >
        <RestrictedModal />

        <CloseBtn onClick={onClose} />
      </Dialog>
    </>
  );
}
