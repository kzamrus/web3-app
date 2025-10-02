import { Box } from '@mui/material';
import { ExternalLink } from 'modules/common/components/ExternalLink';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';

interface IStatusCellProps {
  explorerLink?: string;
}

export function StatusCell({ explorerLink }: IStatusCellProps): JSX.Element {
  const isCompleted = !!explorerLink;
  const { keys, t } = useTranslation(translation);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {t(isCompleted ? keys.completed : keys.pending)}

      {isCompleted && (
        <ExternalLink explorerLink={explorerLink} sx={{ ml: 0 }} />
      )}
    </Box>
  );
}
