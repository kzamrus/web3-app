import { Box } from '@mui/material';
import { TChainId } from 'modules/api';
import { ExternalLink } from 'modules/common/components/ExternalLink';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { t } from 'modules/i18n';

interface INetworkCellProps {
  chainId: TChainId;
  explorerLink?: string;
}

export function NetworkCell({
  chainId,
  explorerLink,
}: INetworkCellProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <NetworkIcon chainId={chainId} sx={{ fontSize: 24, mr: 1 }} />

      {t(`chain.${chainId}`)}

      {explorerLink && (
        <ExternalLink explorerLink={explorerLink} sx={{ ml: 0 }} />
      )}
    </Box>
  );
}
