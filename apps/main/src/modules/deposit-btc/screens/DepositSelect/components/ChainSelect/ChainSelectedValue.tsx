import { Box } from '@mui/material';
import { OChainId, TChainId } from 'modules/api';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { translation } from './translation';

interface IChainSelectValueProps {
  chainId: TChainId;
  address?: string;
}

export function ChainSelectedValue({
  chainId,
  address,
}: IChainSelectValueProps): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const shortAddress = useMemo(() => getShortAddr(address), [address]);

  const isChainSelected = chainId !== OChainId.unsupported;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isChainSelected ? (
        <>
          <NetworkIcon sx={{ fontSize: 28, mr: 1 }} chainId={chainId} />

          {t(`chain.${chainId}`)}

          {address && (
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
              {`(${shortAddress})`}
            </Box>
          )}
        </>
      ) : (
        t(keys.defaultSelect)
      )}
    </Box>
  );
}
