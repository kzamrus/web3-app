import { Box, ButtonBase, IconButton } from '@mui/material';
import { CloseIcon } from 'modules/common/icons';
import { NavLink } from 'react-router-dom';
import { Connect } from '../../../Connect';
import { useNavigationItems } from '../../hooks/useNavigationItems';
import { useHeaderNavMobileStyles } from './useHeaderNavMobileStyles';

interface IHeaderNavMobileProps {
  onCloseClick?: () => void;
}

export function HeaderNavMobile({
  onCloseClick,
}: IHeaderNavMobileProps): JSX.Element {
  const { classes } = useHeaderNavMobileStyles();
  const navItems = useNavigationItems();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <IconButton
          sx={{ color: theme => theme.palette.text.primary }}
          onClick={onCloseClick}
        >
          <Box component={CloseIcon} sx={{ width: 24, height: 24 }} />
        </IconButton>
      </div>

      <nav className={classes.nav}>
        {navItems.map(
          item =>
            item && (
              <ButtonBase
                component={NavLink}
                className={classes.link}
                key={item.title}
                to={item.link}
              >
                {item.title}
              </ButtonBase>
            ),
        )}
      </nav>

      <Box sx={{ display: { md: 'none' } }}>
        <Connect />
      </Box>
    </div>
  );
}
