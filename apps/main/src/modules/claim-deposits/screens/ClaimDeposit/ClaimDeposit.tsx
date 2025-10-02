import { Container } from '@mui/material';
import { claimDepositsRouteConfig } from 'modules/claim-deposits/getClaimDepositsRoutes';
import { Section } from 'modules/common/components/Section';
import { ClaimStatus } from './components/ClaimStatus';
import { TxHashForm } from './components/TxHashForm';

export function ClaimDeposit(): JSX.Element {
  const { txHash } = claimDepositsRouteConfig.claim.useParams();

  return (
    <Section centered>
      <Container maxWidth="sm">
        {txHash ? <ClaimStatus /> : <TxHashForm />}
      </Container>
    </Section>
  );
}
