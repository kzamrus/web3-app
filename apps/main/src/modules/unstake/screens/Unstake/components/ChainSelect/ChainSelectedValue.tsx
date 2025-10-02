import { Box } from '@mui/material';
import { TChainId } from 'modules/api';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { t } from 'modules/i18n';

interface IChainSelectValueProps {
  chainId: TChainId;
}

export function ChainSelectedValue({
  chainId,
}: IChainSelectValueProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <NetworkIcon sx={{ fontSize: 28, mr: 1 }} chainId={chainId} />

      {t(`chain.${chainId}`)}
    </Box>
  );
}
