import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import palette from './palette';

interface IThemeModeWrapper {
  mode: PaletteMode;
  children: ReactNode;
}

export const ModeWrapper = (props: IThemeModeWrapper): ReactElement => {
  const { mode = 'dark', children } = props;
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      ...palette,
    }
  });

  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default ModeWrapper;
