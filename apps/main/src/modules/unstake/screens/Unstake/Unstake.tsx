import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { UnstakeForm } from './components/UnstakeForm';

export function Unstake(): JSX.Element {
  return (
    <Section centered>
      <Container maxWidth="sm">
        <UnstakeForm />
      </Container>
    </Section>
  );
}
