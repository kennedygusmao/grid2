"use client"

import { TextField, MenuItem } from '@mui/material';
import { filterOperators } from '../utils/filter-operators';

interface FilterOperatorSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function FilterOperatorSelect({ value, onChange }: FilterOperatorSelectProps) {
  return (
    <TextField
      select
      label="Operator"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{
        '& .MuiInputBase-root': { color: 'white' },
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiSelect-icon': { color: 'white' },
      }}
    >
      {filterOperators.map((op) => (
        <MenuItem key={op.value} value={op.value}>
          {op.label}
        </MenuItem>
      ))}
    </TextField>
  );
}