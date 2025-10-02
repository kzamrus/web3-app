import { closeSnackbar, SnackbarKey } from 'notistack';

/**
 * Dismiss a specific snackbar by passing the key returned from enqueueSnackbar.
 *
 * If no key is provided, all snackbars will be dismissed.
 *
 * @param {SnackbarKey}  key  Key of notification
 */
export const closeNotification = (key?: SnackbarKey): void => {
  closeSnackbar(key);
};
