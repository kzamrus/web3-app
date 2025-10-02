import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { VaultContextProvider } from '../VaultContextProvider';
import { DepositStatus as DepositStatusComponent } from './components/DepositStatus';

export function DepositStatus() {
  return (
    <VaultContextProvider>
      <Section centered>
        <Container maxWidth="sm">
          <DepositStatusComponent />
        </Container>
      </Section>
    </VaultContextProvider>
  );
}
