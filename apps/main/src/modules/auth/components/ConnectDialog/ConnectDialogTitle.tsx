import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface IConnectDialogTitleProps {
  children?: ReactNode;
}

export function ConnectDialogTitle({
  children,
}: IConnectDialogTitleProps): JSX.Element {
  return (
    <Typography component="h2" variant="h1" sx={{ textAlign: 'center', mb: 4 }}>
      {children}
    </Typography>
  );
}
