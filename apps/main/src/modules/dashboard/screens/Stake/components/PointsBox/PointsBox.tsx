import { Paper, PaperProps } from '@mui/material';
import { usePointsStyles } from './usePointsStyles';

export function PointsBox({
  children,
}: Pick<PaperProps, 'children'>): JSX.Element {
  const { classes } = usePointsStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.content}>{children}</div>
    </Paper>
  );
}
