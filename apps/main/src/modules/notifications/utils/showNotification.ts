import { ReactNode } from 'react';
import { enqueueSnackbar, OptionsObject, SnackbarKey } from 'notistack';

interface IShowNotificationProps extends OptionsObject {
  message: ReactNode;
}

/**
 * Method to show notification. Can be used in any place of the app.
 *
 * @param   {IShowNotificationProps}  props  Props for notification. See https://notistack.com/api-reference#enqueuesnackbar-options
 * @return  {SnackbarKey}                    Key of notification
 */
export const showNotification = (props: IShowNotificationProps): SnackbarKey =>
  enqueueSnackbar(props);
