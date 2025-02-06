'use client';
// components/theme/ThemeToggle.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from './ThemeContext';

function ThemeToggle() {
  const { mode, toggleColorMode } = useTheme();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ThemeToggle;