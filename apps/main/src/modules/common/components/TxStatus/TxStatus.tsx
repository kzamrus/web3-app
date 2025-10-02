import { Paper } from '@mui/material';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTxStatusStyles } from './useTxStatusStyles';

interface ITxStatusProps {
  children?: ReactNode;
  closeLink: string;
}

export function TxStatus({ children, closeLink }: ITxStatusProps): JSX.Element {
  const { classes } = useTxStatusStyles();

  return (
    <Paper className={classes.root}>
      {children}

      <CloseBtn component={Link} to={closeLink} />
    </Paper>
  );
}
