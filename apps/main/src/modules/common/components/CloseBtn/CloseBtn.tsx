import { IconButton, IconButtonProps } from '@mui/material';
import { LinkProps } from 'react-router-dom';
import { default as CloseIcon } from './assets/close.svg?react';
import { useCloseBtnStyles } from './useCloseBtnStyles';

interface CloseBtnProps
  extends IconButtonProps,
    Partial<Omit<LinkProps, keyof IconButtonProps>> {}

export function CloseBtn({
  sx,
  className,
  ...props
}: CloseBtnProps): JSX.Element {
  const { classes, cx } = useCloseBtnStyles();

  return (
    <IconButton
      sx={{ top: { xs: 8, md: 16 }, right: { xs: 8, md: 16 }, ...sx }}
      className={cx(classes.root, className)}
      {...props}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>
  );
}
