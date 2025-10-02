import { Box, BoxProps } from '@mui/material';
import { SUPPORTED_CHAINS_WITH_ICONS } from 'modules/bridge/utils/addChainIcons';
import { useChainFromToStyles } from './useChainFromToStyles';
import { SupportedChain } from 'modules/bridge/types';

export function ChainSelectedValue({
  chainId,
  text,
}: Pick<BoxProps, 'sx'> & Pick<SupportedChain, 'chainId'> & { text: string }) {
  const { classes, cx } = useChainFromToStyles();

  const chain = SUPPORTED_CHAINS_WITH_ICONS.find(
    chain => chain.chainId === chainId,
  );

  if (!chain) return '';

  return (
    <Box className={cx(classes.chainSelectedValue, chain.abbr)}>
      <span>{text}</span>
      <Box>
        <chain.icon className="icon" />
        <span>{chain.name}</span>
      </Box>
    </Box>
  );
}
