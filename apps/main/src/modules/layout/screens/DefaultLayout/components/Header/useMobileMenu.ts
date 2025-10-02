import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IMobileMenu {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useMobileMenu = (): IMobileMenu => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  return {
    isMobileMenuOpen: drawerOpen,
    toggleMobileMenu: toggleDrawer,
  };
};
