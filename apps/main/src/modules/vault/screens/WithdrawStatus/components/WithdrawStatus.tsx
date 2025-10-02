import { Button, Paper, Typography } from '@mui/material';
import { useConnection } from 'modules/auth';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { Ripple } from 'modules/common/components/Ripple';
import { SummaryItem, SummaryList } from 'modules/common/components/Summary';

import { OChainId } from 'modules/api';
import { ExternalLink } from 'modules/common/components/ExternalLink';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { dashboardRouteConfig } from 'modules/dashboard';
import { useTranslation } from 'modules/i18n';
import { VAULT_CONTRACT } from 'modules/vault/const';
import { vaultRoutesConfig } from 'modules/vault/vaultRoutesConfig';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ITransactionRequest } from '../../Vault/types';
import { translation } from './translations';
import { useWithdrawStatusStyles } from './useWithdrawStatusStyles';

interface WithdrawRequests {
  cancelled_requests: ITransactionRequest[];
  expired_requests: ITransactionRequest[];
  fulfilled_requests: ITransactionRequest[];
  open_requests: ITransactionRequest[];
}

interface ApiResponse {
  Response: WithdrawRequests;
}

const dashboardPath = dashboardRouteConfig.main.generatePath();

export function WithdrawStatus() {
  const { classes, cx } = useWithdrawStatusStyles();
  const { keys, t } = useTranslation(translation);
  const { address } = useConnection();

  // todo: use vaultRoutesConfig to get the query params
  const queryParams = useQueryParams();
  const txId = queryParams.get('txId');
  const amount = queryParams.get('amount');
  const [status, setStatus] = useState<WithdrawRequests | null>(null);

  const explorerLink = useMemo(() => {
    return txId ? getExplorerLink(txId, OChainId.ethereum, 'tx') : undefined;
  }, [txId]);

  useEffect(() => {
    // todo: move to a separate RTK action
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://api.sevenseas.capital/withdrawRequests/ethereum/${VAULT_CONTRACT}/${address}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ApiResponse = await response.json();
        setStatus(data.Response);
      } catch (error) {
        console.error('Error fetching the status:', error);
      }
    };

    fetchStatus();
  }, [address]);

  const hasTx = useMemo(() => {
    if (status) {
      return status.open_requests.find(el => el.transactionHash === txId);
    }
  }, [status]);

  const hasFullfilledTx = useMemo(() => {
    if (status) {
      return status.fulfilled_requests.find(el => el.transactionHash === txId);
    }
  }, [status]);

  const txValue = amount || 0;
  const shortTxHash = useMemo(() => getShortAddr(txId!), [txId]);

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h1">
        {(hasTx || !hasFullfilledTx) && t(keys.titlePending)}
        {hasFullfilledTx && t(keys.titleSuccess)}
      </Typography>

      <SummaryList sx={{ my: { xs: 3, md: 5 } }}>
        <SummaryItem
          label={
            <Typography className={cx(classes.item, classes.label)}>
              {t(keys.yourWithdraw)}
            </Typography>
          }
          value={
            <Typography className={classes.item}>{txValue} LBTC</Typography>
          }
        />

        <SummaryItem
          label={
            <Typography className={cx(classes.item, classes.label)}>
              {t(keys.transactionId)}
            </Typography>
          }
          value={
            <Typography className={classes.item}>
              {shortTxHash} <ExternalLink explorerLink={explorerLink!} />
            </Typography>
          }
        />
      </SummaryList>

      <Button
        fullWidth
        variant="contained"
        size="large"
        component={Link}
        to={dashboardPath}
        sx={{ mb: '40px' }}
      >
        {t(keys.goDashboard)}

        <Ripple />
      </Button>

      <Typography className={classes.quote}>{t(keys.quote)}</Typography>

      <CloseBtn component={Link} to={vaultRoutesConfig.main.generatePath()} />
    </Paper>
  );
}
