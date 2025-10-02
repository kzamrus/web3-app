import { Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { translation } from './translation';
import { useTxStatusStyles } from './useTxStatusStyles';

interface ITxStatusTitleProps {
  children?: string | JSX.Element;
  isError: boolean;
}

export function TxStatusTitle({
  children,
  isError,
}: ITxStatusTitleProps): JSX.Element {
  const { classes } = useTxStatusStyles();
  const { keys, t } = useTranslation(translation);

  const title = useMemo(() => {
    if (isError) {
      return t(keys.errorTitle);
    }

    return children;
  }, [children, isError, keys, t]);

  return (
    <Typography className={classes.title} variant="h1">
      {title}
    </Typography>
  );
}
