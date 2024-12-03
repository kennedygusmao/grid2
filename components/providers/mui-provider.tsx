"use client"

import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from 'next-themes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { initializeMUILicense } from '@/lib/config/mui-license';

export function MUIProvider({ children }: { children: React.ReactNode }) {
  const { theme: applicationTheme } = useTheme();

  useEffect(() => {
    initializeMUILicense();
  }, []);

  const theme = createTheme({
    palette: {
      mode: applicationTheme === 'dark' ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}