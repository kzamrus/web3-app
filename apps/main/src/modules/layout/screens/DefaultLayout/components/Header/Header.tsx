import { ButtonBase, Container, Drawer, IconButton } from '@mui/material';
import { dashboardRouteConfig } from 'modules/dashboard';
import { Link } from 'react-router-dom';
import { useHeaderStyles } from './useHeaderStyles';

import { Logo } from 'modules/layout/components/Logo';
import { Connect } from '../../../Connect';
import { HeaderNav } from '../HeaderNav';
import { HeaderNavMobile } from '../HeaderNavMobile';
import { default as MenuIcon } from './assets/menu.svg?react';
import { useMobileMenu } from './useMobileMenu';

const homePath = dashboardRouteConfig.main.generatePath();

export function Header(): JSX.Element {
  const { classes } = useHeaderStyles();
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  return (
    <header className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <ButtonBase to={homePath} component={Link}>
          <Logo className={classes.logo} />
        </ButtonBase>

        <HeaderNav sx={{ display: { xs: 'none', lg: 'grid' } }} />

        <div className={classes.buttons}>
          <Connect />
        </div>

        <IconButton
          onClick={toggleMobileMenu}
          className={classes.menuToggle}
          title="menu"
        >
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
      </Container>

      <Drawer
        open={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        anchor="right"
        PaperProps={{
          elevation: 0,
          sx: { p: 0 },
        }}
      >
        <HeaderNavMobile onCloseClick={toggleMobileMenu} />
      </Drawer>
    </header>
  );
}
