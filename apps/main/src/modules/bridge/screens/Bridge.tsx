import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { BridgeForm } from '../components/BridgeForm';
import { useBridgeStyles } from './useBridgeStyles';

export function Bridge(): JSX.Element {
  const { classes } = useBridgeStyles();

  return (
    <Section centered>
      <Container className={classes.root}>
        <BridgeForm />
      </Container>
    </Section>
  );
}
