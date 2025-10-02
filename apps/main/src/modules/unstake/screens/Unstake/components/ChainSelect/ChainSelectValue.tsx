import { Box } from '@mui/material';
import BigNumber from 'bignumber.js';
import { OLstToken, TChainId } from 'modules/api';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { DECIMAL_PLACES_BTC, ZERO } from 'modules/common/const';
import { t } from 'modules/i18n';

interface IChainSelectValueProps {
  chainId: TChainId;
  balance?: BigNumber;
}

export function ChainSelectValue({
  chainId,
  balance = ZERO,
}: IChainSelectValueProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
        <NetworkIcon sx={{ fontSize: 24, mr: 1 }} chainId={chainId} />

        {t(`chain.${chainId}`)}
      </Box>

      {!balance.isZero() && (
        <Box component="span" sx={{ ml: 1, color: 'text.secondary' }}>
          {t('unit.tokenValue', {
            token: OLstToken.LBTC,
            value: balance.decimalPlaces(DECIMAL_PLACES_BTC).toFormat(),
          })}
        </Box>
      )}
    </Box>
  );
}
