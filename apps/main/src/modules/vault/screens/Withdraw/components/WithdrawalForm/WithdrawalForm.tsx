import { Paper, Typography } from '@mui/material';
import { useConnection } from 'modules/auth';
import { Button } from 'modules/common/components/Button';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { Ripple } from 'modules/common/components/Ripple';
import { SummaryItem, SummaryList } from 'modules/common/components/Summary';
import { useNavigateParams } from 'modules/common/hooks/useNavigateParams';
import { useTranslation } from 'modules/i18n';
import { showNotification } from 'modules/notifications';
import { VAULT_CONTRACT } from 'modules/vault/const';
import { vaultRoutesConfig } from 'modules/vault/vaultRoutesConfig';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AmountField } from './AmountField';
import { translation } from './translation';
import { useWithdrawalForm } from './useWithdrawalForm';
import { useWithdrawalFormStyles } from './useWithdrawalFormStyles';

interface WithdrawRequests {
  cancelled_requests: any[];
  expired_requests: any[];
  fulfilled_requests: any[];
  open_requests: any[];
}

interface ApiResponse {
  Response: WithdrawRequests;
}

export function WithdrawalForm() {
  const { classes } = useWithdrawalFormStyles();
  const { keys, t } = useTranslation(translation);
  const { form, status: formStatus, isLoading, onSubmit } = useWithdrawalForm();
  const { address } = useConnection();

  const navigate = useNavigateParams();

  const [isLoadingStatus, setLoadingStatus] = useState(true);
  const [status, setStatus] = useState<WithdrawRequests | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoadingStatus(true);
        const response = await fetch(
          `https://api.sevenseas.capital/withdrawRequests/ethereum/${VAULT_CONTRACT}/${address}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ApiResponse = await response.json();
        setStatus(data.Response);
        setLoadingStatus(false);
      } catch (error) {
        setLoadingStatus(false);
        showNotification({
          message: t(keys.statusFetchFailed),
          variant: 'error',
        });
      }
    };

    fetchStatus();
  }, [address, formStatus]);

  useEffect(() => {
    if (!status || !formStatus) return;

    const { transactionHash, amount } = status.open_requests[0] || {};
    if (amount && transactionHash) {
      navigate(vaultRoutesConfig.withdrawStatus.generatePath(), {
        txId: `0x${transactionHash}`,
        amount: form.getValues('amount'),
      });
    }
  }, [status, formStatus]);

  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
      <Typography className={classes.title} variant="h1">
        {t(keys.title)}
      </Typography>

      <AmountField {...form} />

      <SummaryList sx={{ my: { xs: 3, md: 5 } }}>
        <SummaryItem
          label={t(keys.withdrawalTime)}
          value={t(keys.withdrawalTimeValue)}
        />
      </SummaryList>

      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={
          !Array.isArray(status?.open_requests) ||
          !!status?.open_requests.length ||
          isLoading
        }
        isLoading={isLoading || isLoadingStatus}
        type="submit"
        sx={{ mb: '40px' }}
      >
        {t(keys.approveWithdrawalBtn)}

        <Ripple />
      </Button>

      <Typography className={classes.quote}>{t(keys.quote)}</Typography>

      <CloseBtn component={Link} to={vaultRoutesConfig.main.generatePath()} />
    </Paper>
  );
}
