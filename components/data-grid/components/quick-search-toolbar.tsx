"use client"

import { Box, TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';

interface QuickSearchToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function QuickSearchToolbar({ value, onChange }: QuickSearchToolbarProps) {
  return (
    <Box sx={{ maxWidth: 300 }}>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filter..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: '8px',
            backgroundColor: 'background.paper',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'divider',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          },
        }}
      />
    </Box>
  );
}