import { Box, Container } from '@mui/material';
import { OLstToken, TChainId } from 'modules/api';
import { useAddTokenToWalletMutation } from 'modules/common/actions/addTokenToWallet';
import { Button } from 'modules/common/components/Button';
import { ExternalLink } from 'modules/common/components/ExternalLink';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { Section } from 'modules/common/components/Section';
import {
  TxStatus,
  TxStatusDesctiption,
  TxStatusInfo,
  TxStatusInfoItem,
  TxStatusInfoTxHash,
  TxStatusTitle,
} from 'modules/common/components/TxStatus';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';
import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { dashboardRouteConfig } from 'modules/dashboard/getDashboardRoutes';
import { useTranslation } from 'modules/i18n';
import { useCallback, useMemo } from 'react';
import { useClaimQueryParams } from '../../hooks/useClaimQueryParams';
import { BackButton } from '../BackButton';
import { translation } from './translation';
import { useConnection } from 'modules/auth';

const dashboardPath = dashboardRouteConfig.main.generatePath();

interface IClaimTxStatusProps {
  chainId: TChainId;
}

export function ClaimTxStatus({ chainId }: IClaimTxStatusProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { txHash, isValidTxHash } = useClaimQueryParams();
  const {
    features: { isAddTokenAvailable },
  } = useConnection();

  const {
    isLoading: isClaimLoading,
    isSuccessful: isClaimSuccessful,
    from,
  } = useTxReceipt(txHash, chainId);

  const [addToken, { isLoading: isAddTokenLoading }] =
    useAddTokenToWalletMutation();

  const handleAddToken = useCallback(() => {
    addToken({ token: OLstToken.LBTC, chainId });
  }, [chainId, addToken]);

  const shortReceiverAddr = useMemo(() => getShortAddr(from), [from]);

  const receiverLink = from
    ? getExplorerLink(from, chainId, 'address')
    : undefined;

  const isError = !isClaimSuccessful && !isClaimLoading;
  const hasTxHash = !!txHash;

  const title = isClaimLoading ? t(keys.pendingTitle) : t(keys.successTitle);
  const description = isClaimLoading ? t(keys.pendingDescription) : undefined;

  return (
    <Section centered>
      <Container maxWidth="sm">
        <TxStatus closeLink={dashboardPath}>
          <TxStatusTitle isError={isError}>{title}</TxStatusTitle>

          <TxStatusDesctiption
            hasTxHash={hasTxHash}
            isValidTxHash={isValidTxHash}
            isError={isError}
          >
            {description}
          </TxStatusDesctiption>

          <TxStatusInfo>
            {isValidTxHash && hasTxHash && (
              <TxStatusInfoTxHash txHash={txHash} network={chainId} />
            )}

            <TxStatusInfoItem label={t(keys.networkLabel)}>
              <NetworkIcon sx={{ mr: 1, fontSize: 24 }} chainId={chainId} />

              {t(`chain.${chainId}`)}
            </TxStatusInfoItem>

            {from && (
              <TxStatusInfoItem label={t(keys.addressLabel)}>
                {shortReceiverAddr}

                {receiverLink && (
                  <ExternalLink sx={{ ml: 0 }} explorerLink={receiverLink} />
                )}
              </TxStatusInfoItem>
            )}
          </TxStatusInfo>

          <Box sx={{ display: 'grid', gap: 2 }}>
            <BackButton />

            {isAddTokenAvailable && (
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleAddToken}
                disabled={isAddTokenLoading}
                isLoading={isAddTokenLoading}
              >
                {t(keys.addToken)}
              </Button>
            )}
          </Box>
        </TxStatus>
      </Container>
    </Section>
  );
}
