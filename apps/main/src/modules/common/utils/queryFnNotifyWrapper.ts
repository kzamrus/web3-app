import { t } from 'modules/i18n';
import {
  closeNotification,
  getNotificationKey,
  showNotification,
} from 'modules/notifications';

import { queryFnNotificationWrapper } from '@ankr.com/utils/queryFnNotificationWrapper';
import { getErrorMessage } from './getErrorMessage';

export const queryFnNotifyWrapper = queryFnNotificationWrapper({
  onNotification({ api, error, onError }) {
    const message =
      typeof onError === 'function' ? onError(error) : getErrorMessage(error);

    showNotification({
      key: api.endpoint,
      message,
      variant: 'error',
    });
  },

  onBeforeQuery: ({ api }) => {
    showNotification({
      key: getNotificationKey(api.endpoint),
      message: t('wallets.confirmTxn'),
      variant: 'info',
      autoHideDuration: null,
    });
  },

  onAfterQuery: ({ api }) => {
    const key = getNotificationKey(api.endpoint);
    closeNotification(key);
  },
});
