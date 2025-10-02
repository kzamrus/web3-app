import { Button, Paper, Typography } from '@mui/material';
import { BITCOIN_NETWORK } from 'modules/api';
import { CloseBtn } from 'modules/common/components/CloseBtn';
import { ExternalLink } from 'modules/common/components/ExternalLink';
import { getExplorerLink } from 'modules/common/utils/getExplorerLink';
import { getShortAddr } from 'modules/common/utils/getShortAddr';
import { useTranslation } from 'modules/i18n';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { validateBitcoinTxId } from '../../../../../common/utils/validateBitcoinTxId';
import { translation } from './translation';
import { useTxStatusStyles } from './useTxStatusStyles';

interface ITxStatusProps {
  txHash?: string;
  closeLink: string;
  buttonLink?: string;
  buttonSlot?: JSX.Element;
  title?: string;
  description?: string;
}

export function TxStatus({
  txHash,
  closeLink,
  buttonLink,
  buttonSlot,
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
      <Typography className={classes.title} variant="h1">
        {title}
      </Typography>

      <Typography className={classes.description}>{description}</Typography>

      {!isError && (
        <div className={classes.txIdRow}>
          <strong>{t(keys.txId)}</strong>

          <span className={classes.txId}>{shortTxHash}</span>

          {explorerLink && <ExternalLink explorerLink={explorerLink} />}
        </div>
      )}

      {!buttonSlot && buttonLink && (
        <Button
          className={classes.backButton}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to={buttonLink}
        >
          {t(keys.toDashboard)}
        </Button>
      )}

      {buttonSlot}

      <CloseBtn component={Link} to={closeLink} />
    </Paper>
  );
}
