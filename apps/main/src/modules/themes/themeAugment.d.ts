import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

export interface ICustomMainColor {
  100: string;
  200: string;
  500: string;
  700: string;
  800: string;
  900: string;
  1000: string;
}

declare module '@mui/material' {
  interface Palette extends MuiPalette {
    customMain: ICustomMainColor;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    customMain: ICustomMainColor;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
  }
}
