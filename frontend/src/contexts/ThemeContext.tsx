import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import { lightColour } from './themeColour/lightColour';
import { darkColour } from './themeColour/darkColour';
import { redColour } from './themeColour/redColour';
import { blueColour } from './themeColour/blueColour';
import { jaina } from './themeColour/jaina';

export type ThemeKeys = 'light' | 'dark' | 'red' | 'blue' | 'jaina' | any;

export type Mode = {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: any;
  textColor?: string;
  color?: string;
  fontFamily?: string;
  borderColor?: string;
  cardBackground?: string;
};

interface ThemeContextProps {
  name: ThemeKeys;
  colors: {
    [key in ThemeKeys]: Mode;
  };
}

export const ThemeContext = createContext<ThemeContextProps>({
  name: 'light',
  colors: {
    light: lightColour,
    dark: darkColour,
    red: redColour,
    blue: blueColour,
    jaina: jaina,
  },
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state:any) => state.theme.theme) as ThemeKeys;

  const colors: { [key in ThemeKeys]: Mode } = {
    light: lightColour,
    dark: darkColour,
    red: redColour,
    blue: blueColour,
    jaina: jaina,
  };

  return (
    <ThemeContext.Provider value={{ name: theme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;