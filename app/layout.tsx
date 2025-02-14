// app/layout.tsx
'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeToggle from '../components/theme/ThemeToggle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CoreProvider from '@/components/core-provider/core-provider';

interface LayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = createTheme();
    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <CoreProvider>
                        {children}
                    </CoreProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}