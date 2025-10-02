import { ReactNode } from 'react';
import { useTxStatusStyles } from './useTxStatusStyles';

interface ITxStatusRowProps {
  label: string;
  children: ReactNode;
}

export function TxStatusRow({
  label,
  children,
}: ITxStatusRowProps): JSX.Element {
  const { classes } = useTxStatusStyles();

  return (
    <div className={classes.row}>
      <strong>{label}</strong>

      <span className={classes.rowValue}>{children}</span>
    </div>
  );
}
