import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

interface IProtocolIconProps extends Pick<BoxProps, 'sx'> {
  icon: string | FC;
}

export function ProtocolIcon({
  icon,
  ...restProps
}: IProtocolIconProps): JSX.Element {
  const isString = typeof icon === 'string';

  return (
    <Box
      {...restProps}
      component={isString ? 'img' : icon}
      src={isString ? icon : undefined}
    />
  );
}
