import { OLstToken } from 'modules/api';
import { claimDepositsRouteConfig } from 'modules/claim-deposits/getClaimDepositsRoutes';
import { Button } from 'modules/common/components/Button';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { t } from 'modules/i18n';
import { TxStatus, TxStatusRow } from '../TxStatus';
import { useClaimStatus } from './useClaimStatus';

export function ClaimStatus(): JSX.Element {
  const {
    chainId,
    amount,
    txHash,
    isDepositNotarized,
    isClaimLoading,
    isNotarizeLoading,
    onClaimClick,
  } = useClaimStatus();

  return (
    <TxStatus
      closeLink={claimDepositsRouteConfig.claim.generatePath()}
      txHash={txHash}
      title={isDepositNotarized ? `Claim ${OLstToken.LBTC}` : undefined}
      description={
        isDepositNotarized ? 'You can claim your deposit now' : undefined
      }
      rowsSlot={
        isNotarizeLoading || !isDepositNotarized ? null : (
          <>
            <TxStatusRow label="Claiming network">
              <NetworkIcon chainId={chainId} sx={{ fontSize: 24, mr: 1 }} />

              {t(`chain.${chainId}`)}
            </TxStatusRow>

            <TxStatusRow label="You will get">
              {t('unit.tokenValue', {
                value: amount,
                token: OLstToken.LBTC,
              })}
            </TxStatusRow>
          </>
        )
      }
      buttonSlot={
        <Button
          fullWidth
          sx={{ mt: 5 }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={onClaimClick}
          isLoading={isNotarizeLoading || isClaimLoading}
          disabled={!isDepositNotarized || isNotarizeLoading || isClaimLoading}
        >
          Claim
        </Button>
      }
    />
  );
}
