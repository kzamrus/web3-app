import { ButtonBase } from '@mui/material';
import { useCopyClick } from 'modules/common/hooks/useCopyClick';
import { CopyIcon, SuccessIcon } from 'modules/common/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useCopyButtonStyles } from './useCopyButtonStyles';

interface ICopyButtonProps {
  text: string;
}

export function CopyButton({ text }: ICopyButtonProps): JSX.Element {
  const { classes } = useCopyButtonStyles();
  const { isCopied, handleCopy } = useCopyClick();

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <ButtonBase className={classes.copyButton}>
        {isCopied ? (
          <SuccessIcon className={classes.copyIcon} />
        ) : (
          <CopyIcon className={classes.copyIcon} />
        )}
      </ButtonBase>
    </CopyToClipboard>
  );
}
