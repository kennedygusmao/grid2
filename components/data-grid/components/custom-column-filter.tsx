"use client"

import { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';
import { GridFilterInputValueProps } from '@mui/x-data-grid-premium';

export function CustomColumnFilter(props: GridFilterInputValueProps) {
  const { item, applyValue, focusElementRef } = props;
  const [filterValue, setFilterValue] = useState(item.value ?? '');

  useEffect(() => {
    setFilterValue(item.value ?? '');
  }, [item.value]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilterValue(newValue);
    applyValue({ ...item, value: newValue });
  };

  return (
    <Box sx={{ p: 1, width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        inputRef={focusElementRef}
        placeholder="Filter..."
        value={filterValue}
        onChange={handleFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 1,
            backgroundColor: 'background.paper',
          },
        }}
      />
    </Box>
  );
}