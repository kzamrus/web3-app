import { ReactNode } from 'react';
import { useTxStatusStyles } from './useTxStatusStyles';

interface ITxStatusInfoProps {
  children?: ReactNode;
}

export function TxStatusInfo({ children }: ITxStatusInfoProps): JSX.Element {
  const { classes } = useTxStatusStyles();

  return <div className={classes.rows}>{children}</div>;
}
