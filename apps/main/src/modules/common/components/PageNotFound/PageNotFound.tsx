import { Container, Typography } from '@mui/material';
import { useTranslation } from 'modules/i18n';
import { Section } from '../Section';
import { translation } from './translation';

export function PageNotFound(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  return (
    <Section centered>
      <Container>
        <Typography
          sx={{
            fontSize: { xs: '6rem', md: '10rem' },
            lineHeight: '1',
            textAlign: 'center',
          }}
        >
          {t(keys.title)}
        </Typography>

        <Typography textAlign="center">{t(keys.notFound)}</Typography>
      </Container>
    </Section>
  );
}
