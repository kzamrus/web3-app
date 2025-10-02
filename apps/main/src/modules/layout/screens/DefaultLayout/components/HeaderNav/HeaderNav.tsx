import { Box, BoxProps, ButtonBase } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useNavigationItems } from '../../hooks/useNavigationItems';
import { useHeaderNavStyles } from './useHeaderNavStyles';

interface IHeaderNavProps extends BoxProps {}

export function HeaderNav({ sx }: IHeaderNavProps): JSX.Element {
  const { classes } = useHeaderNavStyles();

  const navItems = useNavigationItems();

  return (
    <Box component="nav" className={classes.root} sx={sx}>
      {navItems.map(
        item =>
          item && (
            <ButtonBase
              key={item.title}
              className={classes.link}
              {...(item.isExternal
                ? {
                    component: 'a',
                    href: item.link,
                    target: '_blank',
                    rel: 'noreferrer',
                  }
                : {
                    component: NavLink,
                    to: item.link,
                  })}
            >
              {item.title}
            </ButtonBase>
          ),
      )}
    </Box>
  );
}
