import { Box, BoxProps, Skeleton } from '@mui/material';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { CopyButton } from '../CopyButton';
import { QrCodeButton } from '../QrCodeButton';
import { useAddressBoxStyles } from './useAddressBoxStyles';

interface IAddressBoxProps extends Pick<BoxProps, 'className' | 'sx'> {
  isLoading?: boolean;
  value?: string;
  tooltip?: string;
}

export function AddressBox({
  value,
  isLoading,
  tooltip,
  className,
  ...restProps
}: IAddressBoxProps): JSX.Element {
  const { classes, cx } = useAddressBoxStyles();

  const shortAddress = getShortAddr(value, 8);

  return (
    <Box className={cx(classes.box, className)} {...restProps}>
      {isLoading || !value ? (
        <Skeleton className={classes.skeleton} />
      ) : (
        <>
          <span className={classes.value}>{shortAddress}</span>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <QrCodeButton address={value} />
            <CopyButton text={value} />
          </Box>
        </>
      )}
    </Box>
  );
}
