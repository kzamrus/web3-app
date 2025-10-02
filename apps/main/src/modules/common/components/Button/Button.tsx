import {
  Button as ButtonComponent,
  ButtonProps,
  SxProps,
  Theme,
} from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';

import { LinkProps } from 'react-router-dom';
import { Spinner } from '../Spinner';

export interface IButtonProps
  extends ButtonProps,
    Partial<Omit<LinkProps, keyof ButtonProps>> {
  isLoading?: boolean;
}

/**
 * Button component with loading spinner.
 *
 * If you don't need loading spinner, just use `Button` from `@mui/material`.
 */
export const Button = forwardRef(
  (
    {
      isLoading,
      spinnerSx = {
        color: theme => `${theme.palette.customMain[500]} !important`,
      },
      endIcon,
      ...props
    }: IButtonProps & { spinnerSx?: SxProps<Theme> | undefined },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <ButtonComponent
        ref={ref}
        {...props}
        endIcon={isLoading ? <Spinner sx={spinnerSx} size={16} /> : endIcon}
      />
    );
  },
);

Button.displayName = 'Button';
