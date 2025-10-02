import { Grid, Typography } from '@mui/material';
import { CustomContentProps } from 'notistack';
import { forwardRef } from 'react';

import { SuccessIcon } from 'modules/common/icons';
import { default as InfoIcon } from './assets/info-icon.svg?react';
import { default as WarningIcon } from './assets/warning-icon.svg?react';
import { useNotificationStyles } from './useNotificationStyles';

/**
 * Custom notification component.
 */
export const Notification = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ message, action, id, variant, header, hideIconVariant }, ref) => {
    const { cx, classes } = useNotificationStyles();
    const withAction = typeof action !== 'undefined';

    const isInfo = variant === 'info' || variant === 'default';
    const isSuccess = variant === 'success';
    const isWarning = variant === 'warning';
    const isError = variant === 'error';

    return (
      <div
        ref={ref}
        className={cx(classes.root, {
          [classes.info]: isInfo,
          [classes.success]: isSuccess,
          [classes.warning]: isWarning,
          [classes.error]: isError,
        })}
        role="alert"
      >
        <Grid container spacing={1}>
          {!hideIconVariant && (
            <Grid item xs="auto">
              {isSuccess && <SuccessIcon className={classes.icon} />}

              {isWarning && <WarningIcon className={classes.icon} />}

              {isError && <WarningIcon className={classes.icon} />}

              {isInfo && <InfoIcon className={classes.icon} />}
            </Grid>
          )}

          <Grid item xs sx={{ alignSelf: 'center' }}>
            {header && (
              <Typography className={classes.header}>{header}</Typography>
            )}

            <Typography className={classes.text} variant="body2">
              {message}
            </Typography>
          </Grid>

          {withAction && (
            <Grid item xs="auto">
              {typeof action === 'function' ? action(id) : action}
            </Grid>
          )}
        </Grid>
      </div>
    );
  },
);

Notification.displayName = 'Notification';
