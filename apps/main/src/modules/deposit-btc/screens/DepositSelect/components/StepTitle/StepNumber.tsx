import { Box, BoxProps } from '@mui/material';
import { useStepTitleStyles } from './useStepTitleStyles';

interface IStepNumberProps extends Pick<BoxProps, 'sx' | 'className'> {
  number?: number;
  isReady?: boolean;
}

export function StepNumber({
  number = 1,
  isReady,
  ...props
}: IStepNumberProps): JSX.Element {
  const { classes } = useStepTitleStyles();

  return (
    <Box {...props} className={classes.number}>
      {isReady ? <i className={classes.checkedIcon} /> : number}
    </Box>
  );
}
