import { Skeleton, Typography } from '@mui/material';
import { InfoIconWithTooltip } from 'modules/common/components/InfoIconWithTooltip';
import { ReactNode } from 'react';
import { useStakeInfoStyles } from './useStakeInfoStyles';

interface IStakeInfoItemProps {
  label: string;
  value: ReactNode;
  labelTooltip?: string;
  valueTitle?: string;
  additional?: string;
  isLoading?: boolean;
}

export function StakeInfoItem({
  label,
  value,
  labelTooltip,
  valueTitle,
  additional,
  isLoading,
}: IStakeInfoItemProps): JSX.Element {
  const { classes } = useStakeInfoStyles();

  return (
    <li className={classes.summaryItem}>
      <Typography className={classes.summaryItemLabel}>
        {label}

        {labelTooltip && (
          <InfoIconWithTooltip sx={{ opacity: 0.5 }}>
            {labelTooltip}
          </InfoIconWithTooltip>
        )}
      </Typography>

      <div className={classes.summaryItemContent}>
        <Typography className={classes.summaryItemValue} title={valueTitle}>
          {isLoading ? (
            <Skeleton className={classes.summaryItemSkeleton} width={90} />
          ) : (
            value
          )}
        </Typography>

        {additional && (
          <Typography className={classes.summaryItemAdditional}>
            {isLoading ? (
              <Skeleton className={classes.summaryItemSkeleton} width={60} />
            ) : (
              additional
            )}
          </Typography>
        )}
      </div>
    </li>
  );
}
