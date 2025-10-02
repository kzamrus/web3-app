import { Box, BoxProps } from '@mui/material';

interface ISectionProps extends BoxProps {
  centered?: boolean;
}

export function Section({
  sx,
  centered,
  ...restProps
}: ISectionProps): JSX.Element {
  return (
    <Box
      sx={{ py: { xs: 5, md: 8 }, my: centered ? 'auto' : undefined, ...sx }}
      component="section"
      {...restProps}
    />
  );
}
