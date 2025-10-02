import { Typography, TypographyProps } from '@mui/material';

import { useQuoteStyles } from './useQuoteStyles';

export function Quote({
  className,
  ...restProps
}: TypographyProps): JSX.Element {
  const { classes, cx } = useQuoteStyles();

  return <Typography {...restProps} className={cx(classes.root, className)} />;
}
