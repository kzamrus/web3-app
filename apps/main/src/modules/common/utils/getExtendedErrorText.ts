import { getErrorMessage } from './getErrorMessage';

/**
 * Adds additional error text.
 *
 * @return  custom text + original error
 */
export const getExtendedErrorText = (
  error: unknown,
  additionalText: string,
): string => {
  const message = getErrorMessage(error);
  return `${additionalText}. ${message}`;
};
