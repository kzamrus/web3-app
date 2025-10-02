import { Container, Paper, Typography } from '@mui/material';
import { Button } from 'modules/common/components/Button';
import { Section } from 'modules/common/components/Section';
import { useTranslation } from 'modules/i18n';
import { AccessCodeField } from './AccessCodeField';
import { translation } from './translation';
import { useEarlyAccess } from './useEarlyAccess';
import { useEarlyAccessStyles } from './useEarlyAccessStyles';

export function EarlyAccess(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useEarlyAccessStyles();
  const { form, isSubmitting, onSubmit } = useEarlyAccess();
  const errorMessage = form.formState.errors.accessCode?.message;

  return (
    <Section centered>
      <Container maxWidth={false} sx={{ maxWidth: 760 }}>
        <Paper className={classes.root}>
          <Typography variant="h1" className={classes.title}>
            {t(keys.title)}
          </Typography>

          <Typography className={classes.text}>
            {t(keys.description)}
          </Typography>

          <form className={classes.form} onSubmit={onSubmit}>
            <AccessCodeField {...form} disabled={isSubmitting} />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {t(keys.enter)}
            </Button>

            {errorMessage && (
              <Typography className={classes.error}>{errorMessage}</Typography>
            )}
          </form>
        </Paper>
      </Container>
    </Section>
  );
}
