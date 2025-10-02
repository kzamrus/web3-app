import { Container, Typography } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { OfflineTesting } from './components/OfflineTesting';

export function DevPage(): JSX.Element {
  return (
    <Section>
      <Container>
        <Typography variant="h1" sx={{ mb: 1 }}>
          Dev page
        </Typography>

        <Typography sx={{ mb: 4 }}>For testing purpose only</Typography>

        <OfflineTesting />
      </Container>
    </Section>
  );
}
