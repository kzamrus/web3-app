import { VariantType } from 'notistack';

/**
 * Returns a unique key for a notification.
 *
 * @param key - unique key.
 * @param variant - Notification variant. Default is `info`.
 * @returns Notification key.
 *
 * @example
 * getNotificationKey('approveTransaction', 'info'); // => 'info/approveTransaction'
 */
export const getNotificationKey = (
  key: string | number,
  variant: VariantType = 'info',
): string => {
  return `${variant}/${key}`;
};
