import { Box, Container, Paper, Typography } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useWrongNetworkStyles } from './useWrongNetworkStyles';
import { useConnection } from 'modules/auth';
import { OChainId, TChainId } from 'modules/api';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { useNavigate } from 'react-router-dom';
import { Button } from 'modules/common/components/Button';
import { useProvider } from '../../hooks/useWalletProvider';

export function WrongNetwork(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useWrongNetworkStyles();
  const { chainId = OChainId.unsupported } = useConnection();

  const provider = useProvider();

  const navigate = useNavigate();

  const isKnownChain = Object.values(OChainId).includes(chainId as TChainId);

  const onClose = () => navigate('/');

  const handleOpenWallet = () => {
    provider && provider.switchNetwork(OChainId.ethereum);
  };

  return (
    <Section centered>
      <Container maxWidth={false} className={classes.root}>
        <Paper className={classes.paper} sx={{ position: 'relative' }}>
          <Typography variant="h1" className={classes.title}>
            {t(keys.title)}
          </Typography>

          <Box sx={{ textAlign: 'center', mb: '40px' }}>
            <Typography
              variant="body2"
              sx={{
                mb: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t(keys.text1)}
              {isKnownChain && (
                <NetworkIcon
                  chainId={chainId}
                  sx={{ fontSize: 28, mx: 1.25 }}
                />
              )}
              {t(`chain.${isKnownChain ? chainId : OChainId.unsupported}`)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t(keys.text3)}{' '}
              <NetworkIcon chainId={chainId} sx={{ fontSize: 28, mx: 1.25 }} />
              {t('chain.1')}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleOpenWallet}
          >
            {t(keys.button)}
          </Button>

          <CloseBtn onClick={onClose} />
        </Paper>
      </Container>
    </Section>
  );
}
