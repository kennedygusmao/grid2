"use client"

import { Box, TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';

interface CustomFilterPanelProps {
  value: string;
  onChange: (value: string) => void;
}

export function CustomFilterPanel({ value, onChange }: CustomFilterPanelProps) {
  return (
    <Box sx={{ p: 1, width: '100%' }}>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filter..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: '8px',
            backgroundColor: 'background.paper',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
    </Box>
  );
}