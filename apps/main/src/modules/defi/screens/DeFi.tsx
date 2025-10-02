import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { ChainSelector } from './ChainSeletor';
import { Points } from './Points';
import { PositionTable } from './PositionTable';
export function DeFi(): JSX.Element {
  return (
    <Section>
      <Container maxWidth={false} sx={{ maxWidth: 1472 }}>
        <Points />

        <ChainSelector />

        <PositionTable />
      </Container>
    </Section>
  );
}
