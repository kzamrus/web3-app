import { Box, BoxProps } from '@mui/material';

export function TextGradient({
  children,
  sx,
  ...props
}: BoxProps): JSX.Element {
  return (
    <Box
      sx={{
        ...sx,
        background: 'linear-gradient(90deg, #39C1C1 0%, #399694 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
