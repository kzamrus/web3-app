import { Container, Paper, Typography } from '@mui/material';
import { OLstToken, TOTAL_CONFIRMATIONS } from 'modules/api';
import { Button } from 'modules/common/components/Button';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { Section } from 'modules/common/components/Section';
import { SummaryItem, SummaryList } from 'modules/common/components/Summary';
import {
  BLOCK_MINING_TIME,
  RATIO_TEXT,
  STAKE_FEE,
} from 'modules/deposit-btc/const';
import { depositBtcRouteConfig } from 'modules/deposit-btc/depositBtcRoutesConfig';
import { useTranslation } from 'modules/i18n';
import { Link } from 'react-router-dom';
import { AmountField } from './AmountField';
import { translation } from './translation';
import { useStakeBtcWithWallet } from './useStakeBtcWithWallet';
import { useStakeBtcWithWalletStyles } from './useStakeBtcWithWalletStyles';

export function StakeBtcWithWallet(): JSX.Element | null {
  const { classes } = useStakeBtcWithWalletStyles();
  const { keys, t } = useTranslation(translation);

  const {
    amount,
    control,
    isDepositLoading,
    isBtcConnected,
    btcWalletId,
    onSubmit,
    onConnectBtc,
    setValue,
  } = useStakeBtcWithWallet();

  const lbtcAmountText = t('unit.tokenValue', {
    token: OLstToken.LBTC,
    value: amount || 0,
  });

  const titleText =
    isBtcConnected && btcWalletId
      ? t(keys.titleFull, { wallet: t(keys.wallet[btcWalletId]) })
      : t(keys.title);

  return (
    <Section centered>
      <Container maxWidth="sm">
        <Paper className={classes.root} component="form" onSubmit={onSubmit}>
          <Typography className={classes.title} component="h1" variant="h2">
            {titleText}
          </Typography>

          <AmountField setValue={setValue} control={control} />

          <SummaryList className={classes.summary}>
            <SummaryItem
              label={t(keys.youWillGet)}
              value={lbtcAmountText}
              valueSubtitle={RATIO_TEXT}
            />

            <SummaryItem
              label={t(keys.feeLabel)}
              value={t('unit.usdValue', { value: STAKE_FEE })}
              labelTooltip={t(keys.feeTooltip)}
            />

            <SummaryItem
              label={t(keys.confirmationLabel)}
              value={t(keys.confirmationText, {
                minutes: TOTAL_CONFIRMATIONS * BLOCK_MINING_TIME,
                blocks: TOTAL_CONFIRMATIONS,
              })}
            />
          </SummaryList>

          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type={isBtcConnected ? 'submit' : 'button'}
            isLoading={isDepositLoading}
            disabled={isDepositLoading}
            onClick={isBtcConnected ? undefined : onConnectBtc}
          >
            {t(isBtcConnected ? keys.button : keys.connectBtcWallet)}
          </Button>

          <CloseBtn
            component={Link}
            to={depositBtcRouteConfig.main.generatePath()}
          />
        </Paper>
      </Container>
    </Section>
  );
}
