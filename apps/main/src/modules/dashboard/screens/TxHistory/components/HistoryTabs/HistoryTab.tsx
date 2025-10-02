import { Button, ButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useHistoryTabsStyles } from './useHistoryTabsStyles';

type HistoryTabProps = Omit<
  ButtonProps,
  'className' | 'variant' | 'onClick'
> & {
  isActive?: boolean;
};

export function HistoryTab({
  isActive,
  href,
  ...props
}: HistoryTabProps): JSX.Element {
  const { classes, cx } = useHistoryTabsStyles();

  const navigate = useNavigate();

  const handleClick = () => {
    if (isActive || !href) {
      return;
    }
    navigate(href, { replace: true });
  };

  return (
    <Button
      {...props}
      className={cx(classes.tab, isActive && classes.tabActive)}
      variant="contained"
      onClick={handleClick}
    />
  );
}
