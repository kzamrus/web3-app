import { useCallback, useEffect, useState } from 'react';

import { Locale, useTranslation } from 'modules/i18n';
import { showNotification } from 'modules/notifications';
import { Milliseconds } from '../types';

export const translation = {
  [Locale.en]: {
    copied: 'Copied to clipboard',
  },
};

export interface ICopyClickData {
  isCopied: boolean;
  handleCopy: () => void;
}

const TIMEOUT: Milliseconds = 1_500;

export const useCopyClick = (): ICopyClickData => {
  const [isCopied, setIsCopied] = useState(false);
  const { t, keys } = useTranslation(translation);

  const handleCopy = useCallback(() => {
    showNotification({
      message: t(keys.copied),
      variant: 'success',
      autoHideDuration: TIMEOUT,
    });

    setIsCopied(true);
  }, [keys.copied, t]);

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setIsCopied(false);
    }, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return { isCopied, handleCopy };
};
