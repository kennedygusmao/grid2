"use client"

import { useState } from 'react';
import { Box, TextField, Popover, IconButton } from '@mui/material';
import { ChevronDown, Filter } from 'lucide-react';

interface ColumnMenuFilterProps {
  field: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export function ColumnMenuFilter({ field, value, onChange, type = 'text' }: ColumnMenuFilterProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (type === 'number' && newValue !== '') {
      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue)) {
        onChange(newValue);
      }
    } else {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ 
          padding: '2px',
          '&:hover': { backgroundColor: 'transparent' }
        }}
      >
        <Filter size={16} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '8px',
          },
        }}
      >
        <Box sx={{ p: 1, width: 200 }}>
          <TextField
            fullWidth
            size="small"
            value={value}
            onChange={handleChange}
            placeholder="Filter..."
            type={type}
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
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
            }}
          />
        </Box>
      </Popover>
    </Box>
  );
}