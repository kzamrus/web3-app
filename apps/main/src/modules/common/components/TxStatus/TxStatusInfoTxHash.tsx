import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { ExternalLink } from '../ExternalLink';
import { TxStatusInfoItem } from './TxStatusInfoItem';
import { translation } from './translation';

interface ITxStatusInfoTxHashProps {
  txHash: string;
  network?: string | number;
}

export function TxStatusInfoTxHash({
  txHash,
  network,
}: ITxStatusInfoTxHashProps): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const shortTxHash = useMemo(() => getShortAddr(txHash), [txHash]);

  const explorerLink = useMemo(() => {
    return network ? getExplorerLink(txHash, network) : undefined;
  }, [txHash]);

  return (
    <TxStatusInfoItem label={t(keys.txId)}>
      {shortTxHash}

      {!!explorerLink && (
        <ExternalLink sx={{ ml: 0 }} explorerLink={explorerLink} />
      )}
    </TxStatusInfoItem>
  );
}
