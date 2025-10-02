import { Box } from '@mui/material';
import { OChainId, TChainId } from 'modules/api';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';

interface IChainSelectValueProps {
  chainId: TChainId;
}

export function ChainSelectValue({
  chainId,
}: IChainSelectValueProps): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const isChainSelected = chainId !== OChainId.unsupported;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <NetworkIcon sx={{ fontSize: 24, mr: 1 }} chainId={chainId} />

      {t(isChainSelected ? `chain.${chainId}` : keys.defaultSelect)}
    </Box>
  );
}
