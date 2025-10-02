import { Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { translation } from './translation';
import { useTxStatusStyles } from './useTxStatusStyles';

interface ITxStatusDesctiptionProps {
  children?: string | JSX.Element;
  hasTxHash?: boolean;
  isValidTxHash?: boolean;
  isError?: boolean;
}

export function TxStatusDesctiption({
  children,
  hasTxHash,
  isValidTxHash,
  isError,
}: ITxStatusDesctiptionProps): JSX.Element | null {
  const { classes } = useTxStatusStyles();
  const { keys, t } = useTranslation(translation);

  const description = useMemo(() => {
    if (hasTxHash && isValidTxHash && isError) {
      return t(keys.checkStatus);
    }

    if (!hasTxHash) {
      return t(keys.txHashNotFound);
    }

    if (!isValidTxHash) {
      return t(keys.txHashInvalid);
    }

    return children;
  }, [children, hasTxHash, isValidTxHash, t, keys]);

  if (!description) {
    return null;
  }

  return <Typography className={classes.description}>{description}</Typography>;
}
