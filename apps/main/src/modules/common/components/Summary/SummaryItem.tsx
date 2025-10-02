import { Skeleton, Typography } from '@mui/material';

import { InfoIconWithTooltip } from 'modules/common/components/InfoIconWithTooltip';
import { useSummaryStyles } from './useSummaryStyles';

interface ISummaryItemProps {
  label: React.ReactNode;
  labelSubtitle?: string;
  value: React.ReactNode;
  labelTooltip?: string;
  valueTitle?: string;
  valueSubtitle?: string;
  isLoading?: boolean;
  className?: string;
}

export function SummaryItem({
  label,
  labelSubtitle,
  value,
  labelTooltip,
  valueTitle,
  valueSubtitle,
  isLoading,
  className,
}: ISummaryItemProps): JSX.Element {
  const { classes, cx } = useSummaryStyles();
  return (
    <li className={cx(classes.item, className)}>
      <div>
        <Typography className={classes.itemLabel}>
          {label}

          {labelTooltip && (
            <InfoIconWithTooltip sx={{ opacity: 0.5 }}>
              {labelTooltip}
            </InfoIconWithTooltip>
          )}
        </Typography>

        {labelSubtitle && (
          <Typography className={classes.itemAdditional}>
            {labelSubtitle}
          </Typography>
        )}
      </div>

      <div className={classes.itemContent}>
        <Typography className={classes.itemValue} title={valueTitle}>
          {isLoading ? (
            <Skeleton className={classes.itemSkeleton} width={90} />
          ) : (
            value
          )}
        </Typography>

        {valueSubtitle && (
          <Typography className={classes.itemAdditional}>
            {isLoading ? (
              <Skeleton className={classes.itemSkeleton} width={60} />
            ) : (
              valueSubtitle
            )}
          </Typography>
        )}
      </div>
    </li>
  );
}
