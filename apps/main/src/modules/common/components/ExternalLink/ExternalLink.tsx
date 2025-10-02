import { IconButton, IconButtonProps } from '@mui/material';
import { ExternalIcon } from 'modules/common/icons';
import { useExternalLinkStyles } from './useExternalLinkStyles';

interface IExternalLinkProps extends Pick<IconButtonProps, 'sx'> {
  explorerLink: string;
}

export function ExternalLink({
  explorerLink,
  sx,
}: IExternalLinkProps): JSX.Element {
  const { classes } = useExternalLinkStyles();

  return (
    <IconButton
      component="a"
      href={explorerLink}
      target="_blank"
      rel="norefferer"
      sx={{ p: 1, m: -1, ...sx }}
      className={classes.root}
    >
      <ExternalIcon className={classes.icon} />
    </IconButton>
  );
}
