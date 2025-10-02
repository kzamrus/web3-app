import { Box, BoxProps } from '@mui/material';
import { useSummaryStyles } from './useSummaryStyles';

type SummaryListProps = Pick<BoxProps, 'children' | 'sx' | 'className'>;

export function SummaryList({
  className,
  ...props
}: SummaryListProps): JSX.Element {
  const { classes, cx } = useSummaryStyles();

  return (
    <Box {...props} className={cx(classes.summary, className)} component="ul" />
  );
}
