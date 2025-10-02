import { Button, Paper, Typography } from '@mui/material';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { Ripple } from 'modules/common/components/Ripple';
import { SummaryItem, SummaryList } from 'modules/common/components/Summary';

import { useTranslation } from 'modules/i18n';
import { vaultRoutesConfig } from 'modules/vault/vaultRoutesConfig';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { translation } from './translations';
import { useDepositStatusStyles } from './useDepositStatusStyles';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { dashboardRouteConfig } from 'modules/dashboard';
import { ExternalLink } from 'modules/common/components/ExternalLink';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { useBoringVaultV1 } from 'boring-vault-ui';

const dashboardPath = dashboardRouteConfig.main.generatePath();

export function DepositStatus() {
  const { classes, cx } = useDepositStatusStyles();
  const { keys, t } = useTranslation(translation);
  const { depositStatus } = useBoringVaultV1();
  const [isPending, setPending] = useState(true);
  const queryParams = useQueryParams();
  const txId = queryParams.get('txId');
  const amount = queryParams.get('amount');
  const token = queryParams.get('token');
  const navigate = useNavigate();
  const txValue = amount || 0;

  const explorerLink = useMemo(() => {
    return txId ? `https://etherscan.io/tx/${txId}` : undefined;
  }, [txId]);

  const shortTxHash = useMemo(() => getShortAddr(txId!), [txId]);

  useEffect(() => {
    if (depositStatus.loading && depositStatus.tx_hash === txId) {
      setPending(true);
    } else if (txId) {
      setPending(false);
    } else if (!txId || !amount) {
      navigate(vaultRoutesConfig.main.generatePath());
    }
  }, [depositStatus]);

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h1">
        {isPending ? t(keys.titlePending) : t(keys.titleSuccess)}
      </Typography>

      <SummaryList sx={{ my: { xs: 3, md: 5 } }}>
        <SummaryItem
          label={
            <Typography className={cx(classes.item, classes.label)}>
              {t(keys.yourDeposit)}
            </Typography>
          }
          value={
            <Typography className={classes.item}>
              {txValue} {token || 'LBTC'}
            </Typography>
          }
        />

        <SummaryItem
          className={classes.item}
          label={
            <Typography className={cx(classes.item, classes.label)}>
              {t(keys.transactionId)}
            </Typography>
          }
          value={
            <Typography className={classes.item}>
              {shortTxHash}
              <ExternalLink explorerLink={explorerLink!} />
            </Typography>
          }
        />
      </SummaryList>

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mb: '40px' }}
        component={Link}
        to={dashboardPath}
      >
        {t(keys.goDashboard)}

        <Ripple />
      </Button>

      <CloseBtn component={Link} to={vaultRoutesConfig.main.generatePath()} />
    </Paper>
  );
}
