import { Box, Typography, useTheme } from '@mui/material';
import { OLstToken, getValidChain } from 'modules/api';
import { getNetworkConfig } from 'modules/api/web3SDK/utils/getNetworkConfig';
import { useConnection } from 'modules/auth';
import { Button } from 'modules/common/components/Button';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { CopyButton } from 'modules/deposit-btc/screens/DepositSelect/components/CopyButton';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { useAddLbtcToken } from '../../hooks/useAddLbtcToken';
import { translation } from './translation';

const token = OLstToken.LBTC;

// interface ILbtcInfoProps {}

export function LbtcInfo(): JSX.Element {
  // const classes = useLbtcInfoStyles();
  const {
    chainId: currentChainId,
    isConnected,
    features: { isAddTokenAvailable },
  } = useConnection();
  const chainId = getValidChain(currentChainId);
  const theme = useTheme();
  const { keys, t } = useTranslation(translation);
  const { onAddToken, isLoading: isAddTokenLoading } = useAddLbtcToken();

  const contractAddress = useMemo(() => {
    const networkConfig = getNetworkConfig(chainId);
    return networkConfig[token];
  }, [chainId]);

  const shortAddress = getShortAddr(contractAddress, 9);

  return (
    <>
      <Typography
        sx={{ fontSize: { xs: 32, md: 40 }, fontWeight: 500, mb: 1.5 }}
      >
        {t(keys.dialog.title)}
      </Typography>

      <Typography sx={{ mb: 2 }}>{t(keys.dialog.text1)}</Typography>

      <Typography>{t(keys.dialog.text2)}</Typography>

      {isConnected && (
        <>
          <Typography sx={{ mt: 5, mb: 1, fontWeight: 'bolder' }}>
            {t(keys.tokenAddress)}
          </Typography>

          <Box
            sx={{
              p: 2,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: `1px solid ${theme.palette.grey[200]}`,
              color: 'text.primary',
            }}
          >
            <Typography
              component="span"
              color="text.primary"
              sx={{ display: { sm: 'none' } }}
            >
              {shortAddress}
            </Typography>

            <Typography
              component="span"
              color="text.primary"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {contractAddress}
            </Typography>

            <CopyButton text={contractAddress} />
          </Box>

          {isAddTokenAvailable && (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              disabled={isAddTokenLoading}
              isLoading={isAddTokenLoading}
              onClick={onAddToken}
            >
              {t(keys.addToken)}
            </Button>
          )}
        </>
      )}
    </>
  );
}
