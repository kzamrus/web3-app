import { Box, Container, Paper, Typography } from '@mui/material';
import { TOTAL_CONFIRMATIONS } from 'modules/api';
import { useWalletConnectModal } from 'modules/auth';
import { Button } from 'modules/common/components/Button';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { Section } from 'modules/common/components/Section';
import { featureConfig } from 'modules/common/featureConfig';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { dashboardRouteConfig } from 'modules/dashboard';
import {
  BLOCK_MINING_TIME,
  RATIO_TEXT,
  STAKE_FEE,
} from 'modules/deposit-btc/const';
import { useTranslation } from 'modules/i18n';
import { Link } from 'react-router-dom';
import { MIN_STAKE_AMOUNT } from '../../../common/const';
import { IncentivesInfo } from './IncentivesInfo';
import { AddressBox } from './components/AddressBox';
import { ChainSelect } from './components/ChainSelect/ChainSelect';
import { Footnote } from './components/Footnote';
import { SanctionedAddress } from './components/SanctionedAddress/';
import { StakeInfo, StakeInfoItem } from './components/StakeInfo';
import { StakeMethodBox } from './components/StakeMethodBox';
import { StakeViaWallet } from './components/StakeViaWallet';
import { StepTitle } from './components/StepTitle';
import { StepNumber } from './components/StepTitle/StepNumber';
import { translation } from './translation';
import { useDepositSelect } from './useDepositSelect';
import { useDepositSelectStyles } from './useDepositSelectStyles';

export function DepositSelect(): JSX.Element {
  const { classes } = useDepositSelectStyles();
  const { keys, t } = useTranslation(translation);

  const {
    evmWalletAddress,
    control,
    depositAddress,
    isConnected,
    isDepositAddressLoading,
    isChainSelected,
    isAddressConfirmed,
    isConfirmLoading,
    isSanctionedAddress,
    onAddressConfirm,
    onSubmit,
  } = useDepositSelect();

  const { onOpen } = useWalletConnectModal();

  const shortAddress = getShortAddr(evmWalletAddress);

  return (
    <Section centered>
      <Container maxWidth="sm">
        <Paper className={classes.root} component="form" onSubmit={onSubmit}>
          <Typography variant="h1" className={classes.title}>
            {t(keys.title)}
          </Typography>

          <ol className={classes.steps}>
            <li className={classes.step}>
              <StepTitle isReady={isChainSelected} number={1}>
                {t(keys.selectNetwork)}
              </StepTitle>

              <ChainSelect control={control} />
            </li>

            <li className={classes.step}>
              <StepTitle isReady={isAddressConfirmed && isConnected} number={2}>
                {t(keys.confirmAddress)}
              </StepTitle>

              {isAddressConfirmed && isConnected ? (
                <div className={classes.addressBox}>
                  <Box component="span" sx={{ display: { sm: 'none' } }}>
                    {shortAddress}
                  </Box>

                  <Box
                    component="span"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    {evmWalletAddress}
                  </Box>

                  <StepNumber sx={{ ml: 1 }} isReady />
                </div>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={
                    isConnected && (!isChainSelected || isConfirmLoading)
                  }
                  isLoading={isConfirmLoading}
                  onClick={isConnected ? onAddressConfirm : onOpen}
                >
                  {t(isConnected ? keys.confirmBtn : keys.connect)}
                </Button>
              )}
            </li>

            {!isSanctionedAddress && (
              <li className={classes.step}>
                <StepTitle number={3}>{t(keys.chooseMethod)}</StepTitle>

                {isAddressConfirmed && isConnected ? (
                  <div className={classes.stakeMethods}>
                    <StakeMethodBox
                      title={t(keys.stakeDirectly)}
                      description={t(keys.stakeDirectlyDescr, {
                        minStake: MIN_STAKE_AMOUNT,
                      })}
                      tooltip={t(keys.stakeDirectlyTooltip, {
                        minStake: MIN_STAKE_AMOUNT,
                      })}
                    >
                      <AddressBox
                        value={depositAddress}
                        isLoading={isDepositAddressLoading}
                      />
                    </StakeMethodBox>

                    <StakeViaWallet isDisabled={!depositAddress} />
                  </div>
                ) : (
                  <Button disabled variant="contained" size="large">
                    {t(keys.completeConfirm)}
                  </Button>
                )}
              </li>
            )}
          </ol>

          {isSanctionedAddress && <SanctionedAddress />}

          {isAddressConfirmed && isConnected && !isSanctionedAddress && (
            <StakeInfo sx={{ mt: 5 }}>
              <StakeInfoItem label={t(keys.exchangeRate)} value={RATIO_TEXT} />

              <StakeInfoItem
                label={t(keys.stakingFee)}
                value={t('unit.usdValue', { value: STAKE_FEE })}
                labelTooltip={t(keys.feeTooltip)}
              />

              <IncentivesInfo />

              <StakeInfoItem
                label={t(keys.confirmationTime)}
                value={t(keys.confirmationTimeValue, {
                  minutes: TOTAL_CONFIRMATIONS * BLOCK_MINING_TIME,
                  blocks: TOTAL_CONFIRMATIONS,
                })}
              />
            </StakeInfo>
          )}

          <CloseBtn
            component={Link}
            to={dashboardRouteConfig.main.generatePath()}
          />
        </Paper>

        {!featureConfig.isUnstakeAvailable && <Footnote sx={{ mt: 2 }} />}
      </Container>
    </Section>
  );
}
