import { ReactNode } from 'react';
import { useTxStatusStyles } from './useTxStatusStyles';

interface ITxStatusInfoItemProps {
  label: string;
  children: ReactNode;
}

export function TxStatusInfoItem({
  label,
  children,
}: ITxStatusInfoItemProps): JSX.Element {
  const { classes } = useTxStatusStyles();

  return (
    <div className={classes.row}>
      <strong>{label}</strong>

      <span className={classes.rowValue}>{children}</span>
    </div>
  );
}
