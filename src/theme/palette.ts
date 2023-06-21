// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { PaletteOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    background: Record<BackgroundColors, string>;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    grey: true;
    white: true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    tertiary: true;
    grey: true;
    white: true;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    background: Record<BackgroundColors, string>;
  }
}

export type BackgroundColors =
  | 'biege'
  | 'biegeLightSoft'
  | 'white'
  | 'whiteSoft'
  | 'green'
  | 'pastelGreenSoft'
  | 'purpleLight'
  | 'purpleLightSoft'
  | 'softPurple'
  | 'softLightGrey'
  | 'grayLight'
  | 'lightGrey'
  | 'grayDisabled'
  | 'iconHover'
  | 'pastelBlue'
  | 'pinkSoft'
  | 'redSoft'
  | 'red'
  | 'redSoftLight'
  | 'blueSoft';

export type CustomPaletteOptions = PaletteOptions & {
  background: Record<BackgroundColors, string>;
  primary: Record<string, string>;
};

export const primary: Record<string, string> = {
  main: '#005f5bde',
  dark: '#002624de',
  darkGrey: '#646b6ade',
  light: '#aad5d3de',
  white: '#edf1f1de'
};

const background: Record<BackgroundColors, string> = {
  beigeDark: '#dbba9b',
  beigeLight: '#f2dbb7',
  white: '#efefef',
  green: '#4ca64c',
  gray: '#808080',
  redSoft: '#ff6666',
  red: '#ff0000',
  iconHover: '#727991',
  blueSoft: '#E9F1F5',
  pastelBlue: '#4c4cff'
};
const text: Record<string, string> = {
  primary: '#444398',
  secondary: '#7f5200'
};

const secondary: Record<string, string> = {
  main: '#ef7b00',
  dark: '#7f4100de',
  light: '#e1bc94de'
};

const error: Record<string, string> = {
  main: '#ff0000de',
  dark: '#cc0000',
  light: '#c86969de'
};

const success: Record<string, string> = {
  main: '#0c8000de',
  dark: '#064200de',
  light: '#81bd7bde'
};
const info: Record<string, string> = {
  main: '#007bffde',
  dark: '#004085de',
  light: '#739ecdde'
};

const warning: Record<string, string> = {
  main: '#e4bc00c2',
  dark: '#8e7500c2',
  light: '#ebdd9ac2'
};

const palette: CustomPaletteOptions = {
  text,
  background,
  primary,
  secondary,
  error,
  success,
  info,
  warning
};

export default palette;
