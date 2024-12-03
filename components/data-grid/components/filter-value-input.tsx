"use client"

import { TextField } from '@mui/material';

interface FilterValueInputProps {
  value: string;
  onChange: (value: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

export function FilterValueInput({ value, onChange, inputRef }: FilterValueInputProps) {
  return (
    <TextField
      inputRef={inputRef}
      label="Value"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{
        '& .MuiInputBase-root': { color: 'white' },
        '& .MuiInputLabel-root': { color: 'white' },
      }}
    />
  );
}