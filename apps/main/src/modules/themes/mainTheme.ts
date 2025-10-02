import {
  alpha,
  createTheme,
  menuItemClasses,
  ThemeOptions,
} from '@mui/material';
import { gridClasses } from '@mui/x-data-grid';
import { PLAYFAIR_DISPLAY_FONT_FAMILY, SECOND_FONT_FAMILY } from './const';
import { ICustomMainColor } from './themeAugment';

/**
 * https://chir.ag/projects/name-that-color/#F49B33
 */
const seaBuckthornColor = '#F49B33';

const greenPalette: ICustomMainColor = {
  100: '#E2F6F4',
  200: '#C8F0EC',
  500: '#6EC5C5',
  700: '#60AFAF',
  800: '#3A9997',
  900: '#167C7C',
  1000: '#086565',
};

const greyPalette = {
  50: '#F4F4F4',
  100: '#C1C4C9',
  200: '#9DA1A6',
  400: '#5F6367',
  600: '#3B3E42',
  800: '#1E2022',
  900: '#161719',
  A100: '#1F2226',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    action: {
      selected: alpha('#fff', 0.05),
    },
    customMain: greenPalette,
    primary: {
      main: greenPalette[900],
    },
    secondary: {
      main: '#fff',
    },
    background: {
      default: greenPalette[100],
      paper: '#fff',
    },
    text: {
      primary: greyPalette[900],
      secondary: greyPalette[400],
    },
    grey: greyPalette,
    divider: greyPalette[50],
    success: {
      main: greenPalette[900],
    },
    warning: {
      main: '#EAB144',
      light: '#FFF7E4',
    },
  },
});

export const mainThemeOptions: ThemeOptions = {
  palette: theme.palette,
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: 'Inter Tight, sans-serif',

    h1: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(28),
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(48),
      },
    },

    h2: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(24),
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(38),
      },
    },

    h3: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(18),
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(22),
      },
    },

    h4: {
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,
    },

    h5: {
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,
    },

    h6: {
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,
    },

    label: {
      fontWeight: 700,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(18),
      },
    },
    body1: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          background: theme.palette.background.default,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(3.5),
            paddingRight: theme.spacing(3.5),
          },
        },

        maxWidthSm: {
          [theme.breakpoints.up('sm')]: {
            maxWidth: 776,
          },
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.common.white, 0.5),
        },
      },
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          '&:active': {
            transform: 'translateY(1px)',
          },

          '&$disabled': {
            '&:active': {
              transform: 'none',
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 60,
          fontFamily: SECOND_FONT_FAMILY,

          '&:hover': {
            boxShadow: 'none',
          },
        },

        containedPrimary: {
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.common.white,

          '&:hover': {
            backgroundColor: seaBuckthornColor,
          },

          '&.Mui-disabled': {
            backgroundColor: theme.palette.customMain[100],
            color: theme.palette.customMain[500],
          },
        },

        containedSecondary: {
          backgroundColor: greenPalette[700],
          color: theme.palette.common.white,

          '&:hover': {
            backgroundColor: greenPalette[800],
          },

          '&.Mui-disabled': {
            backgroundColor: greenPalette[100],
            color: greenPalette[500],
          },
        },

        containedInfo: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,

          '&:hover': {
            backgroundColor: theme.palette.customMain[200],
          },

          '&:disabled': {
            color: theme.palette.background.paper,
          },
        },

        outlined: {
          borderRadius: 40,
        },

        outlinedInfo: {
          color: theme.palette.text.primary,
          borderColor: theme.palette.common.white,

          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.1),
            borderColor: theme.palette.common.white,
          },
        },

        sizeLarge: {
          height: 52,
          fontWeight: 600,

          [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(18),
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          fontWeight: 700,
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.grey[200]}`,

          '&:hover, &.Mui-focused': {
            borderColor: theme.palette.grey[900],
          },
        },
      },
    },

    MuiSelect: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        select: {
          '&.MuiSelect-select': {
            padding: theme.spacing(0, 2),
            height: 58,
            display: 'flex',
            alignItems: 'center',

            '&:focus': {
              backgroundColor: 'transparent',
            },
          },
        },
        icon: {
          color: theme.palette.text.primary,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          background: theme.palette.background.paper,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,

          [`&.${menuItemClasses.selected}`]: {
            backgroundColor: alpha(theme.palette.common.white, 0.1),

            [`&:hover, &.${menuItemClasses.focusVisible}`]: {
              backgroundColor: alpha(theme.palette.common.white, 0.1),
            },
          },
        },
      },
    },

    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
        },
      },
    },

    MuiTooltip: {
      defaultProps: {
        enterTouchDelay: 0,
        leaveTouchDelay: 10_000,
      },

      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.grey[900],
          fontSize: theme.typography.pxToRem(14),
          padding: theme.spacing(1, 2),
          boxShadow: theme.shadows[5],
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',

          [`& .${gridClasses.footerContainer}`]: {
            display: 'none',
          },

          [`& .${gridClasses.columnSeparator}`]: {
            [`&:not(.${gridClasses['columnSeparator--resizable']})`]: {
              display: 'none',
            },
          },
        },

        cell: {
          [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(16),
          },

          '&:focus, &:focus-within': {
            outline: 'none',
          },
        },

        columnHeader: {
          fontWeight: 600,
          color: theme.palette.text.secondary,

          [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(16),
          },

          '&:focus, &:focus-within': {
            outline: 'none',
          },
        },
      },
    },
  },
  mixins: {
    MuiDataGrid: {
      containerBackground: theme.palette.background.paper,
    },
  },
};

export const mainTheme = createTheme(mainThemeOptions);
