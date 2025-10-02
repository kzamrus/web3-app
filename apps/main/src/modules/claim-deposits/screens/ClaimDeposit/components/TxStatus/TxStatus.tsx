import { Paper, Typography } from '@mui/material';
import { BITCOIN_NETWORK } from 'modules/api';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { ExternalLink } from 'modules/common/components/ExternalLink';
import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { validateBitcoinTxId } from 'modules/common/utils/validateBitcoinTxId';
import { useTranslation } from 'modules/i18n';
import { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TxStatusRow } from './TxStatusRow';
import { translation } from './translation';
import { useTxStatusStyles } from './useTxStatusStyles';

interface ITxStatusProps {
  txHash?: string;
  closeLink: string;
  buttonLink?: string;
  buttonSlot?: JSX.Element;
  rowsSlot?: ReactNode;
  title?: string;
  description?: string;
}

export function TxStatus({
  txHash,
  closeLink,
  buttonSlot,
  rowsSlot,
  title: titleProp,
  description: descriptionProp,
}: ITxStatusProps): JSX.Element {
  const { classes } = useTxStatusStyles();
  const { keys, t } = useTranslation(translation);

  const shortTxHash = useMemo(() => getShortAddr(txHash), [txHash]);

  const explorerLink = useMemo(() => {
    return txHash ? getExplorerLink(txHash, BITCOIN_NETWORK) : undefined;
  }, [txHash]);

  const isValidTxHash = useMemo(
    () => (txHash ? validateBitcoinTxId(txHash) : false),
    [txHash],
  );

  const hasTxHash = !!txHash;
  const isError = !txHash || !isValidTxHash;

  const title = useMemo(() => {
    if (titleProp) {
      return titleProp;
    }

    if (isError) {
      return t(keys.errorTitle);
    }

    return t(keys.title);
  }, [titleProp, isError, keys, t]);

  const description = useMemo(() => {
    if (descriptionProp) {
      return descriptionProp;
    }

    if (!hasTxHash) {
      return t(keys.txHashNotFound);
    }
    if (!isValidTxHash) {
      return t(keys.txHashInvalid);
    }

    return t(keys.description);
  }, [descriptionProp, hasTxHash, isValidTxHash, t, keys]);

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>

      <Typography className={classes.description}>{description}</Typography>

      <div className={classes.rows}>
        {!isError && (
          <TxStatusRow label={t(keys.txId)}>
            {shortTxHash}

            {explorerLink && (
              <ExternalLink sx={{ ml: 0 }} explorerLink={explorerLink} />
            )}
          </TxStatusRow>
        )}

        {rowsSlot}
      </div>

      {buttonSlot}

      <CloseBtn component={Link} to={closeLink} />
    </Paper>
  );
}
