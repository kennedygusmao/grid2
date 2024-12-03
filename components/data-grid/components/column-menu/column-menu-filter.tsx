"use client"

import { useState } from 'react';
import { Box, TextField, Popover, IconButton } from '@mui/material';
import { Filter } from 'lucide-react';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: '#ffffff',
    backgroundColor: '#2a2a2a',
    borderRadius: '4px',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4a4a4a',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#5a5a5a',
      },
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#3a3a3a',
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
    '&::placeholder': {
      color: '#9ca3af',
      opacity: 1,
    },
  },
}));

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
          color: '#ffffff',
          opacity: 0.7,
          transition: 'all 0.2s',
          '&:hover': { 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            opacity: 1,
          }
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
            backgroundColor: '#1a1a1a',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            border: '1px solid #333333',
          },
        }}
      >
        <Box sx={{ p: 2, width: 250 }}>
          <StyledTextField
            fullWidth
            size="small"
            value={value}
            onChange={handleChange}
            placeholder={`Filter ${field}...`}
            type={type}
            autoFocus
          />
        </Box>
      </Popover>
    </Box>
  );
}