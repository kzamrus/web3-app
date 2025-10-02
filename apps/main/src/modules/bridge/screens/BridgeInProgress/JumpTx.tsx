import { Box, BoxProps, Button } from '@mui/material';
import { default as JumpIcon } from '../../icons/jump-icon.svg?react';
import { default as SpinnerIcon } from '../../icons/spinner-icon.svg?react';
import { default as SuccessIcon } from '../../icons/success-icon.svg?react';
import { useJumpTxStyles } from './useJumpTxStyles';
import { translation } from './translation';
import { useTranslation } from 'modules/i18n';

export function JumpTx({
  sx,
  url,
  tx,
  isWaiting,
}: Pick<BoxProps, 'sx'> & {
  url?: string;
  tx?: string;
  isWaiting?: boolean;
}): JSX.Element {
  const { classes, cx } = useJumpTxStyles();
  const { t, keys } = useTranslation(translation);

  return (
    <Box className={cx(classes.root, 'jump-tx')} sx={sx}>
      <Button
        variant="text"
        href={`${url}${tx ? `tx=${tx}` : ''}`}
        target="_blank"
      >
        <span>{t(keys.tx)}</span>
        <JumpIcon />
      </Button>
      {isWaiting ? (
        <SpinnerIcon className={classes.spinner} />
      ) : (
        <SuccessIcon />
      )}
    </Box>
  );
}
