import { Box, Paper, Typography } from '@mui/material';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { Ripple } from 'modules/common/components/Ripple';
import { useTranslation } from 'modules/i18n';
import { vaultRoutesConfig } from 'modules/vault/vaultRoutesConfig';
import { Link } from 'react-router-dom';
import { AmountField } from './AmountField';
import { translation } from './translation';
import { useDepositForm } from './useDepositForm';
import { useDepositFormStyles } from './useDepositFormStyles';
import { useEffect } from 'react';
import { useNavigateParams } from 'modules/common/hooks/useNavigateParams';
import { Button } from 'modules/common/components/Button';
import { SelectTokenField } from '../SelectTokenField';

export function DepositForm() {
  const { classes } = useDepositFormStyles();
  const { keys, t } = useTranslation(translation);
  const { form, status, isLoading, onSubmit } = useDepositForm();

  const navigate = useNavigateParams();

  useEffect(() => {
    if (!status) return;
    const { amount, txId } = status;

    navigate(vaultRoutesConfig.depositStatus.generatePath(), {
      amount: amount!,
      txId: txId!,
      token: selectedToken,
    });
  }, [status]);

  const selectedToken = form.watch('selectedToken');

  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
      <Typography className={classes.title} variant="h1">
        {t(keys.title)}
      </Typography>

      <SelectTokenField sx={{ mb: 5 }} {...form} />

      <AmountField {...form} />

      <Box className={classes.buttonsWrapper}>
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
        >
          {t(
            selectedToken === 'LBTC'
              ? keys.approveLbtcBtn
              : keys.approveWbtcBtn,
          )}

          <Ripple />
        </Button>
      </Box>

      <Typography className={classes.quote}>{t(keys.quote)}</Typography>

      <CloseBtn component={Link} to={vaultRoutesConfig.main.generatePath()} />
    </Paper>
  );
}
