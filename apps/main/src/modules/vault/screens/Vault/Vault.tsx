import { Box, Container, Typography } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { useTranslation } from 'modules/i18n';
import { VaultContextProvider } from '../VaultContextProvider';
import { CurrentAllocationsWidget } from './components/CurrentAllocationsWidget/CurrentAllocationsWidget';
import { DetailsWidget } from './components/DetailsWidget/DetailsWidget';
import { HowItWorksWidget } from './components/HowItWorksWidget/HowItWorksWidget';
import { MainWidget } from './components/MainWidget';
import { StrategyDescriptionWidget } from './components/StrategyDescriptionWidget/StrategyDescriptionWidget';
import { translation } from './translation';
import { useVaultStyles } from './useVaultStyles';
import { WithdrawalPendingStatusWidget } from './components/PendingStatusWidget';

export function Vault() {
  const { t, keys } = useTranslation(translation);
  const { classes } = useVaultStyles();

  return (
    <VaultContextProvider>
      <Section>
        <Container maxWidth={false} sx={{ maxWidth: 1472 }}>
          <Typography variant="h1" sx={{ mb: 1.5 }} className={classes.title}>
            {t(keys.title)}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
            <MainWidget />

            <HowItWorksWidget />

            <WithdrawalPendingStatusWidget />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
              gap={5}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  width: { xs: '100%', md: 'auto' },
                  position: 'relative',
                }}
              >
                <CurrentAllocationsWidget />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  width: { xs: '100%', md: 'auto' },
                  position: 'relative',
                }}
              >
                <DetailsWidget />
              </Box>
            </Box>

            <StrategyDescriptionWidget />
          </Box>
        </Container>
      </Section>
    </VaultContextProvider>
  );
}
