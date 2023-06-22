import {
  ThemeProvider,
  createTheme,
  Palette,
  PaletteColorOptions,
  SimplePaletteColorOptions
} from '@mui/material/styles';
import { ThemeOptions } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import palette, { CustomPaletteOptions } from './palette';
import typography from './typography';
import { useAppSelector } from '../redux/hooks';

interface AppThemeProps {
  children: ReactNode;
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1Montserrat: React.CSSProperties;
    h2Montserrat: React.CSSProperties;
    h3Montserrat: React.CSSProperties;
    h4Montserrat?: React.CSSProperties;
    subtitle1Montserrat?: React.CSSProperties;
    subtitle2Montserrat?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1Montserrat?: React.CSSProperties;
    h2Montserrat?: React.CSSProperties;
    h3Montserrat?: React.CSSProperties;
    h4Montserrat?: React.CSSProperties;
    subtitle1Montserrat?: React.CSSProperties;
    subtitle2Montserrat?: React.CSSProperties;
    body2Montserrat?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1Montserrat: true;
    h2Montserrat: true;
    h3Montserrat: true;
    h4Montserrat: true;
    subtitle1Montserrat: true;
    subtitle2Montserrat: true;
  }
}

export type CustomThemeOptions = ThemeOptions & {
  palette: CustomPaletteOptions;
};

const theme: CustomThemeOptions = {
  typography,
  palette: palette as CustomPaletteOptions
};

// "primary" | "secondary" | "error" ....
export type PaletteKey = keyof {
  [Key in keyof Palette as Palette[Key] extends PaletteColorOptions ? Key : never]: true;
};

export type PaletteColorKey = keyof SimplePaletteColorOptions;

export const AppTheme = (props: AppThemeProps): ReactElement => {
  const { children } = props;
  const { themeMode } = useAppSelector<HomeState>((state) => state.homeReducer);

  const appTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode: themeMode === 'dark' ? 'dark' : 'light'
    }
  }) as unknown as CustomThemeOptions;

  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default AppTheme;
