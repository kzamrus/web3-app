import { Button } from '@mui/material';
import { OChainId, TChainId } from 'modules/api';
import { useConnection } from 'modules/auth';
import { NetworkIcon } from 'modules/common/components/NetworkIcon';
import { t } from 'modules/i18n';
import { useNetworkBtnStyles } from './useNetworkBtnStyles';

export function NetworkBtn(): JSX.Element {
  const { classes, cx } = useNetworkBtnStyles();
  const { chainId = OChainId.unsupported } = useConnection();

  const isKnownChain = Object.values(OChainId).includes(chainId as TChainId);

  return (
    <Button
      className={cx(classes.root, isKnownChain && classes.rightPadding)}
      variant="contained"
      color="info"
      title={`${chainId}`}
      disabled
    >
      {isKnownChain && (
        <NetworkIcon chainId={chainId} sx={{ fontSize: 28, mr: 1.25 }} />
      )}

      {t(`chain.${isKnownChain ? chainId : OChainId.unsupported}`)}
    </Button>
  );
}
