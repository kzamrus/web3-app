import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { VaultContextProvider } from '../VaultContextProvider';
import { DepositForm } from './components/DepositForm';

export function Deposit() {
  return (
    <VaultContextProvider>
      <Section centered>
        <Container maxWidth="sm">
          <DepositForm />
        </Container>
      </Section>
    </VaultContextProvider>
  );
}
