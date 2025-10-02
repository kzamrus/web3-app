import { Dialog, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { useConnection } from 'modules/auth';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { MoreIcon } from 'modules/common/icons';
import { useDialog } from 'modules/dialogs';
import { useTranslation } from 'modules/i18n';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useAddLbtcToken } from '../../hooks/useAddLbtcToken';
import { LbtcInfo } from '../LbtcInfo';
import { translation } from './translation';

const MENU_ID = 'lbtc-amount-menu';
const MENU_TRIGGER_ID = 'lbtc-amount-menu-trigger';

export function LbtcAmountMenu(): JSX.Element {
  const theme = useTheme();
  const { keys, t } = useTranslation(translation);
  const {
    isConnected,
    features: { isAddTokenAvailable },
  } = useConnection();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { onAddToken, isLoading: isAddTokenLoading } = useAddLbtcToken();

  const {
    isOpened: isDialogOpen,
    onClose: onDialogClose,
    onOpen: onDialogOpen,
  } = useDialog('LBTC-Info');

  const isMenuOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleAddToken = useCallback(async () => {
    await onAddToken();
    handleMenuClose();
  }, [onAddToken, handleMenuClose]);

  const handleTokenInfoClick = useCallback(() => {
    handleMenuClose();
    onDialogOpen();
  }, []);

  return (
    <>
      <IconButton
        id={MENU_TRIGGER_ID}
        aria-controls={isMenuOpen ? MENU_ID : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleMenuOpen}
        sx={{ color: 'text.secondary', m: -1 }}
      >
        <MoreIcon style={{ width: 24, height: 24 }} />
      </IconButton>

      <Menu
        id={MENU_ID}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': MENU_TRIGGER_ID,
        }}
        sx={{
          '& .MuiMenu-list': {
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          },
          '& .MuiMenuItem-root': {
            p: 0,
            minHeight: 0,
            color: 'text.secondary',
            fontSize: theme.typography.pxToRem(14),
            fontWeight: 500,

            '&:hover': {
              backgroundColor: 'transparent',
              color: 'primary.main',
            },
          },
        }}
      >
        <MenuItem onClick={handleTokenInfoClick}>{t(keys.tokenInfo)}</MenuItem>

        {isConnected && isAddTokenAvailable && (
          <MenuItem onClick={handleAddToken} disabled={isAddTokenLoading}>
            {t(keys.addToken)}
          </MenuItem>
        )}
      </Menu>

      <Dialog
        fullWidth
        open={isDialogOpen}
        onClose={onDialogClose}
        PaperProps={{ sx: { p: { md: 5 }, backgroundImage: 'none' } }}
      >
        <LbtcInfo />

        <CloseBtn onClick={onDialogClose} />
      </Dialog>
    </>
  );
}
