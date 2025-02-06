// app/layout.tsx
'use client'; // 👈️ Adicione esta linha AQUI, no topo do arquivo!

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeToggle from '../components/theme/ThemeToggle';
import { ThemeProviderWrapper } from '../components/theme/ThemeContext';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '../components/theme/ThemeContext';

interface LayoutProps {
    children: React.ReactNode;
}

function AppContent({ children }: LayoutProps) { // Remova a tipagem duplicada : LayoutProps
    const { theme } = useTheme();

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProviderWrapper>
                    <AppContent>
                        <ThemeToggle /> {/* 👈️ Mova o ThemeToggle para DENTRO de AppContent */}
                        {children}
                    </AppContent>
                </ThemeProviderWrapper>
            </body>
        </html>
    );
}