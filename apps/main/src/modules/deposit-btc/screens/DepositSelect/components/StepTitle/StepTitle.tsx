import { Box, BoxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { StepNumber } from './StepNumber';
import { useStepTitleStyles } from './useStepTitleStyles';

interface IStepTitleProps extends Pick<BoxProps, 'sx' | 'className'> {
  number: number;
  children: ReactNode;
  isReady?: boolean;
}

export function StepTitle({
  number,
  children,
  sx,
  className,
  isReady,
}: IStepTitleProps): JSX.Element {
  const { classes, cx } = useStepTitleStyles();

  return (
    <Box sx={sx} className={cx(classes.root, className)}>
      <StepNumber number={number} isReady={isReady} />

      <Typography component="h3" sx={{ fontWeight: 'bolder' }}>
        {children}
      </Typography>
    </Box>
  );
}
