import { useBoringVaultV1 } from 'boring-vault-ui';
import { useEffect, useState } from 'react';
import { translation } from './translation';
import { useTranslation } from 'modules/i18n';
import { useWithdrawCancelStyles } from './useWithdrawCancelStyles';
import { Section } from 'modules/common/components/Section';
import { Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from 'modules/common/components/Button';
import { useNavigate } from 'react-router-dom';
import { vaultRoutesConfig } from 'modules/vault/vaultRoutesConfig';
import { showNotification } from 'modules/notifications';
import { getErrorMessage } from 'modules/common/utils/getErrorMessage';
import { CircularProgress } from '@mui/material';
import { useVaultProvider } from 'modules/vault/hooks/useVaultProvider';

interface Token {
  address: string;
  decimals: number;
  abi?: any;
  image?: string;
  displayName?: string;
}

interface WithdrawQueueStatus {
  sharesWithdrawing: number;
  blockNumberOpened: number;
  deadlineUnixSeconds: number;
  errorCode: number;
  minSharePrice: number;
  timestampOpenedUnixSeconds: number;
  transactionHashOpened: string;
  tokenOut: Token;
}

export function WithdrawCancel() {
  const { keys, t } = useTranslation(translation);
  const { classes } = useWithdrawCancelStyles();
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [statuses, setStatuses] = useState<any>(null);
  const provider = useVaultProvider();
  const { withdrawQueueCancel, withdrawQueueStatuses } = useBoringVaultV1();

  const handleClose = () => {
    navigate(vaultRoutesConfig.main.generatePath());
  };

  const handleCancelWithdraw = async () => {
    setLoading(true);
    if (!provider || !statuses) {
      setLoading(false);
      return;
    }

    try {
      const [withdrawTransaction] = statuses;

      const signer = await provider.getSigner();
      await withdrawQueueCancel(signer, withdrawTransaction.tokenOut);
      setRefetch(value => value + 1);
    } catch (err) {
      setStep(2);
      showNotification({
        message: getErrorMessage(err),
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      setLoading(true);

      if (!provider) {
        setLoading(false);
        return;
      }

      try {
        const signer = await provider.getSigner();
        const fetchedStatuses: WithdrawQueueStatus[] =
          await withdrawQueueStatuses(signer!);

        setLoading(false);
        setStatuses(fetchedStatuses);
        const [withdrawTransaction] = fetchedStatuses;

        setStep(!withdrawTransaction ? 1 : 0);
      } catch (err) {
        setStep(2);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchStatuses();
    }, 500);

    return () => clearTimeout(timeout);
  }, [provider, withdrawQueueStatuses, refetch]);

  return (
    <Section centered>
      <Container maxWidth={false} className={classes.root}>
        <Paper className={classes.paper}>
          {isLoading && (
            <Box className={classes.row}>
              <CircularProgress className={classes.loader} />
            </Box>
          )}
          {!isLoading && (
            <>
              {step === 0 && (
                <>
                  <Typography variant="h1" className={classes.title}>
                    {t(keys.title1)}
                  </Typography>
                  <Typography className={classes.subtitle} variant="body2">
                    {t(keys.text1)}
                  </Typography>
                  <Box className={classes.row}>
                    <Button
                      className={classes.confirm}
                      onClick={handleCancelWithdraw}
                    >
                      {t(keys.cancel)}
                    </Button>
                    <Button className={classes.close} onClick={handleClose}>
                      {t(keys.close)}
                    </Button>
                  </Box>
                </>
              )}
              {step === 1 && (
                <>
                  <Typography variant="h1" className={classes.title}>
                    {t(keys.title2)}
                  </Typography>
                  <Box className={classes.row} sx={{ mt: '50px' }}>
                    <Button className={classes.close} onClick={handleClose}>
                      {t(keys.close)}
                    </Button>
                  </Box>
                </>
              )}
              {step === 2 && (
                <>
                  <Typography variant="h1" className={classes.title}>
                    {t(keys.title3)}
                  </Typography>
                  <Box className={classes.row}>
                    <Button className={classes.close} onClick={handleClose}>
                      {t(keys.close)}
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Section>
  );
}
