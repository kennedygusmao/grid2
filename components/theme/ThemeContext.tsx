'use client';
// components/theme/ThemeContext.tsx
import React, {
    createContext,
    useState,
    useContext,
    useMemo,
    ReactNode,
  } from 'react';
  import { createTheme } from '@mui/material/styles'; // Importe PaletteMode aqui
  import { PaletteMode } from '@mui/material';
  import { lightTheme, darkTheme } from './theme';
  
  interface ThemeContextValue {
    theme: ReturnType<typeof createTheme>;
    toggleColorMode: () => void;
    mode: PaletteMode;
    setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
  }
  
  const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
  
  export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme deve ser usado dentro de um ThemeProviderWrapper');
    }
    return context;
  };
  
  interface ThemeProviderWrapperProps {
    children: ReactNode;
  }
  
  export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>('light');
  
    const toggleColorMode = () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
  
    const theme = useMemo(
      () =>
        createTheme(
          mode === 'dark' ? darkTheme : lightTheme
        ),
      [mode],
    );
  
    const value = useMemo<ThemeContextValue>(
      () => ({
        theme,
        toggleColorMode,
        mode,
        setMode,
      }),
      [theme, toggleColorMode, mode, setMode],
    );
  
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  };