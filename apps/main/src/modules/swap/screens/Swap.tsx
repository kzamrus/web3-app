import { Container } from '@mui/material';
import { Section } from 'modules/common/components/Section';
import { useSwapStyles } from './useSwapStyles';
import { SwapForm } from '../components/SwapForm';

export function Swap(): JSX.Element {
  const { classes } = useSwapStyles();

  return (
    <Section centered>
      <Container className={classes.root}>
        <SwapForm />
      </Container>
    </Section>
  );
}
