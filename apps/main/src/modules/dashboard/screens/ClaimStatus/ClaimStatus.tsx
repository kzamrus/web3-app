import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { ClaimTxStatus } from './components/ClaimTxStatus';
import { WrongNetworkParam } from './components/WrongNetworkParam';
import { useClaimQueryParams } from './hooks/useClaimQueryParams';

export function ClaimStatus(): JSX.Element {
  const { chainId } = useClaimQueryParams();

  return (
    <Section centered>
      <Container maxWidth="sm">
        {chainId ? <ClaimTxStatus chainId={chainId} /> : <WrongNetworkParam />}
      </Container>
    </Section>
  );
}
