import { ButtonBase, Paper, PaperProps, Typography } from '@mui/material';
import { UNSTAKE_INFO_LINK } from 'modules/common/const';
import { HourglassIcon } from 'modules/common/icons';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useFootnoteStyles } from './useFootnoteStyles';

export function Footnote({ sx }: Pick<PaperProps, 'sx'>): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useFootnoteStyles();

  return (
    <Paper sx={sx} className={classes.root}>
      <HourglassIcon className={classes.icon} />

      <Typography variant="body2" className={classes.text}>
        {t(keys.text)}

        {` `}

        <ButtonBase
          className={classes.link}
          component="a"
          href={UNSTAKE_INFO_LINK}
          target="_blank"
          rel="noreferrer"
        >
          {t(keys.learnMore)}
        </ButtonBase>
      </Typography>
    </Paper>
  );
}
