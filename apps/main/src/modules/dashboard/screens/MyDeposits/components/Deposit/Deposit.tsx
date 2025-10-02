import { Paper, Tooltip } from '@mui/material';
import { BITCOIN_NETWORK, OLstToken, TOTAL_CONFIRMATIONS } from 'modules/api';
import { Button } from 'modules/common/components/Button';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { Spinner } from 'modules/common/components/Spinner';
import { ExternalIcon } from 'modules/common/icons';
import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { BLOCK_MINING_TIME } from 'modules/deposit-btc/const';
import { useTranslation } from 'modules/i18n';
import { RestrictedInfo } from './RestrictedInfo';
import { translation } from './translation';
import { useDeposit } from './useDeposit';
import { useDepositStyles } from './useDepositStyles';

interface IDepositProps {
  txId: string;
  txIndex?: number;
  currentBlockHeight?: number;
}

export function Deposit({
  txId,
  txIndex = 0,
  currentBlockHeight,
}: IDepositProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes, cx } = useDepositStyles();

  const {
    amount,
    chainId,
    currentConfirmations,
    isClaimLoading,
    isClaimDisabled,
    isRestricted,
    onClaimClick,
  } = useDeposit({ txId, txIndex, currentBlockHeight });

  const confirmed = currentConfirmations >= TOTAL_CONFIRMATIONS;

  const isClaimBtnDisabled =
    isRestricted || isClaimDisabled || !confirmed || isClaimLoading;

  const withStatus = !confirmed || isClaimDisabled;

  return (
    <Paper
      className={cx(
        classes.root,
        (withStatus || isRestricted) && classes.extraCol,
      )}
      data-confirmations={currentConfirmations}
    >
      <span className={classes.amount}>
        {t('unit.tokenValue', { value: amount, token: OLstToken.LBTC })}
      </span>

      <a
        className={classes.txHash}
        href={getExplorerLink(txId, BITCOIN_NETWORK, 'tx')}
        target="_blank"
        rel="norefferer"
      >
        <ExternalIcon className={classes.txHashIcon} />

        {t(keys.txHash)}
      </a>

      <div className={classes.chain}>
        <NetworkIcon chainId={chainId} className={classes.chainIcon} />

        {t(`chain.${chainId}`)}
      </div>

      <Button
        className={classes.button}
        variant="contained"
        disabled={isClaimBtnDisabled}
        onClick={onClaimClick}
        isLoading={isClaimLoading}
      >
        {t(isRestricted ? keys.mintNA : keys.mint)}
      </Button>

      {isRestricted && <RestrictedInfo />}

      {withStatus && !isRestricted && (
        <Tooltip
          title={t(keys.stakeTimeTooltip, {
            time: TOTAL_CONFIRMATIONS * BLOCK_MINING_TIME,
          })}
        >
          <div className={classes.status}>
            <Spinner size={20} />

            {isClaimDisabled && confirmed
              ? t(keys.notarization)
              : t(keys.confirmations, {
                  current: currentConfirmations,
                  total: TOTAL_CONFIRMATIONS,
                })}
          </div>
        </Tooltip>
      )}
    </Paper>
  );
}
