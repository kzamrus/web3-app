import { Paper, Typography } from '@mui/material';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { SummaryItem, SummaryList } from 'modules/common/components/Summary';
import { UNSTAKING_TEXT } from 'modules/common/const';
import { dashboardRouteConfig } from 'modules/dashboard';
import { useTranslation } from 'modules/i18n';
import { Link } from 'react-router-dom';
import { AddressField } from '../AddressField';
import { ChainSelect } from '../ChainSelect';
import { AmountField } from './AmountField';
import { SubmitBtn } from './SubmitBtn';
import { SummaryFee } from './SummaryFee';
import { SummaryReceive } from './SummaryReceive';
import { translation } from './translation';
import { useUnstakeForm } from './useUnstakeForm';
import { useUnstakeFormStyles } from './useUnstakeFormStyles';

export function UnstakeForm(): JSX.Element {
  const { classes } = useUnstakeFormStyles();
  const { keys, t } = useTranslation(translation);
  const { form, isSubmitting, onSubmit } = useUnstakeForm();
  const amount = form.watch('amount');

  return (
    <Paper className={classes.root} component="form" onSubmit={onSubmit}>
      <Typography className={classes.title} variant="h1">
        {t(keys.title)}
      </Typography>

      <div className={classes.controls}>
        <ChainSelect {...form} disabled={isSubmitting} />

        <AmountField {...form} disabled={isSubmitting} />

        <AddressField {...form} disabled={isSubmitting} />
      </div>

      <SummaryList sx={{ my: { xs: 3, md: 5 } }}>
        <SummaryReceive amount={amount} />

        <SummaryFee />

        <SummaryItem label={t(keys.unstakingTime)} value={UNSTAKING_TEXT} />
      </SummaryList>

      <SubmitBtn isLoading={isSubmitting} />

      <CloseBtn
        component={Link}
        to={dashboardRouteConfig.main.generatePath()}
      />
    </Paper>
  );
}
