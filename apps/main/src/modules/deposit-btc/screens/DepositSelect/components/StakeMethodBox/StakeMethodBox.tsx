import { Paper, PaperProps, Typography } from '@mui/material';
import { InfoIconWithTooltip } from 'modules/common/components/InfoIconWithTooltip';
import { useStakeMethodBoxStyles } from './useStakeMethodBoxStyles';

interface IStakeMethodBoxProps extends PaperProps {
  title: string;
  description?: string;
  tooltip?: string;
}

export function StakeMethodBox({
  children,
  title,
  className,
  tooltip,
  description,
  ...props
}: IStakeMethodBoxProps): JSX.Element {
  const { classes, cx } = useStakeMethodBoxStyles();
  const withDescription = Boolean(description);

  return (
    <Paper {...props} className={cx(classes.root, className)}>
      <Typography
        className={classes.title}
        sx={{
          mb: {
            xs: withDescription ? 0 : 2,
            md: withDescription ? undefined : 'auto',
          },
        }}
      >
        {title}

        {tooltip && (
          <InfoIconWithTooltip sx={{ color: 'grey.400' }}>
            {tooltip}
          </InfoIconWithTooltip>
        )}
      </Typography>

      {withDescription && (
        <Typography className={classes.description}>{description}</Typography>
      )}

      {children}
    </Paper>
  );
}
