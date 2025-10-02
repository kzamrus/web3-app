import { Button, Container, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { OLstToken } from 'modules/api';
import { Section } from 'modules/common/components/Section';
import {
  TxStatus,
  TxStatusDesctiption,
  TxStatusHeader,
  TxStatusInfo,
  TxStatusInfoItem,
  TxStatusInfoTxHash,
  TxStatusTitle,
} from 'modules/common/components/TxStatus';
import { DECIMAL_PLACES_BTC, UNSTAKING_TEXT } from 'modules/common/const';
import { dashboardRouteConfig } from 'modules/dashboard/getDashboardRoutes';
import { useTranslation } from 'modules/i18n';
import { Link } from 'react-router-dom';
import { translation } from './translation';
import { useResetCachedBalances } from './useResetCachedBalances';
import { useUnstakeStatus } from './useUnstakeStatus';

const dashboardPath = dashboardRouteConfig.main.generatePath();

export function UnstakeStatus(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { amount, txHash, isValidTxHash, chainId } = useUnstakeStatus();
  useResetCachedBalances();

  const hasTxHash = !!txHash;

  return (
    <Section centered>
      <Container maxWidth="sm">
        <TxStatus closeLink={dashboardPath}>
          <TxStatusHeader>
            <TxStatusTitle isError={!isValidTxHash}>
              {t(keys.successTitle)}
            </TxStatusTitle>

            <TxStatusDesctiption
              hasTxHash={hasTxHash}
              isValidTxHash={isValidTxHash}
            />
          </TxStatusHeader>

          <TxStatusInfo>
            {amount && (
              <TxStatusInfoItem label={t(keys.yourUnstake)}>
                {t('unit.tokenValue', {
                  value: new BigNumber(amount)
                    .decimalPlaces(DECIMAL_PLACES_BTC)
                    .toFormat(),
                  token: OLstToken.LBTC,
                })}
              </TxStatusInfoItem>
            )}

            {isValidTxHash && hasTxHash && (
              <TxStatusInfoTxHash txHash={txHash} network={chainId} />
            )}
          </TxStatusInfo>

          <Button
            fullWidth
            component={Link}
            to={dashboardPath}
            variant="contained"
            size="large"
          >
            {t(keys.toDashboard)}
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 3 }}>
            {t(keys.unstakePeriod, { period: UNSTAKING_TEXT })}
          </Typography>
        </TxStatus>
      </Container>
    </Section>
  );
}
