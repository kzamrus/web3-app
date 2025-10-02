import { Button, Container, Paper, Typography } from '@mui/material';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { useWalletConnectModal } from 'modules/auth/hooks/useConnectionModal';
import { Section } from 'modules/common/components/Section';
import { useTranslation } from 'modules/i18n';
import { ReactNode, useEffect } from 'react';
import { translation } from './translation';

interface IConnectionGuardProps {
  children: ReactNode;
  /**
   * Instantly show connect modal if user is not connected
   * @default true
   */
  showConnectModal?: boolean;
}

export function ConnectionGuard({
  children,
  showConnectModal = true,
}: IConnectionGuardProps): JSX.Element {
  const { isConnected } = useConnection();
  const { isOpened, onOpen } = useWalletConnectModal();
  const { keys, t } = useTranslation(translation);

  useEffect(() => {
    if (!isConnected && showConnectModal) {
      onOpen();
    }
  }, [isConnected, showConnectModal]);

  if (isConnected) {
    return <>{children}</>;
  }

  return (
    <Section centered>
      <Container maxWidth="sm">
        <Paper sx={{ px: { md: 8 }, py: 5 }}>
          <Typography variant="h1" textAlign="center" gutterBottom>
            {t(keys.title)}
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            marginBottom={4}
          >
            {t(keys.description)}
          </Typography>

          <Button
            onClick={onOpen}
            disabled={isOpened}
            size="large"
            variant="contained"
            fullWidth
          >
            {t(keys.connect)}
          </Button>
        </Paper>
      </Container>
    </Section>
  );
}
