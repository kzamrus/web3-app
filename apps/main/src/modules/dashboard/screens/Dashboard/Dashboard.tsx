import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { useUpdateOptimisticClaims } from 'modules/dashboard/hooks/useUpdateOptimisticClaims';
import { MyDeposits } from '../MyDeposits';
import { Stake } from '../Stake';
import { TxHistory } from '../TxHistory';

export function Dashboard(): JSX.Element {
  useUpdateOptimisticClaims();

  return (
    <Section>
      <Container maxWidth={false} sx={{ maxWidth: 1472 }}>
        <Stake />

        <MyDeposits sx={{ mt: { xs: 5, md: 7.5 } }} />

        <TxHistory />
      </Container>
    </Section>
  );
}
