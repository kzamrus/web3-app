import { Box, BoxProps } from '@mui/material';

export function StakeInfo({
  children,
  sx,
}: Pick<BoxProps, 'children' | 'sx'>): JSX.Element {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
