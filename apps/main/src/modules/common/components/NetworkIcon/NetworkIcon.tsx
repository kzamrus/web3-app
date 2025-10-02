import { Box, BoxProps } from '@mui/material';
import { OChainId } from 'modules/api';
import { default as ethIcon } from './assets/ethereum.svg';

interface INetworkIconProps extends Pick<BoxProps, 'sx' | 'className'> {
  chainId?: number;
}

export function NetworkIcon({
  chainId,
  sx,
  ...restProps
}: INetworkIconProps): JSX.Element {
  const svgIconId = getNetworkIcon(chainId);

  return (
    <Box
      {...restProps}
      sx={{ width: '1em', height: '1em', ...sx }}
      component="svg"
    >
      <use xlinkHref={`#${svgIconId}`} />
    </Box>
  );
}

// todo: add icons according to the TChainId
function getNetworkIcon(chainId?: number): string {
  switch (chainId) {
    case OChainId.ethereum:
    case OChainId.holesky:
    default:
      return ethIcon;
  }
}
