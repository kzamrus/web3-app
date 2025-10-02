import { Box, BoxProps } from '@mui/material';

export function TxStatusHeader({ sx, ...props }: BoxProps): JSX.Element {
  return <Box {...props} sx={{ ...sx, mb: { xs: 4, md: 6 } }} />;
}
