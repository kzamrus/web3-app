import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { dashboardRouteConfig } from 'modules/dashboard';
import { depositBtcRouteConfig } from 'modules/deposit-btc/depositBtcRoutesConfig';
import { TxStatus } from './components/TxStatus';

export function DepositStatus(): JSX.Element {
  const { txHash } = depositBtcRouteConfig.status.useParams();

  return (
    <Section centered>
      <Container maxWidth="sm">
        <TxStatus
          closeLink={depositBtcRouteConfig.main.generatePath()}
          txHash={txHash}
          buttonLink={dashboardRouteConfig.main.generatePath()}
        />
      </Container>
    </Section>
  );
}
