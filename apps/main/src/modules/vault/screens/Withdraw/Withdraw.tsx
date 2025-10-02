import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { VaultContextProvider } from '../VaultContextProvider';
import { WithdrawalForm } from './components/WithdrawalForm';

export function Withdraw() {
  return (
    <VaultContextProvider>
      <Section centered>
        <Container maxWidth="sm">
          <WithdrawalForm />
        </Container>
      </Section>
    </VaultContextProvider>
  );
}
