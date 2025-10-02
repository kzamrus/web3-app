import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { VaultContextProvider } from '../VaultContextProvider';
import { WithdrawStatus as WithdrawStatusComponent } from './components/WithdrawStatus';

export function WithdrawStatus() {
  return (
    <VaultContextProvider>
      <Section centered>
        <Container maxWidth="sm">
          <WithdrawStatusComponent />
        </Container>
      </Section>
    </VaultContextProvider>
  );
}
