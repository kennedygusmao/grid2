"use client"

import { useState } from 'react';
import { Box } from '@mui/material';
import { GridFilterInputValueProps } from '@mui/x-data-grid-premium';
import { FilterOperatorSelect } from './filter-operator-select';
import { FilterValueInput } from './filter-value-input';

export function CustomFilterInput(props: GridFilterInputValueProps) {
  const { item, applyValue, focusElementRef } = props;
  const [filterValue, setFilterValue] = useState(item.value ?? '');
  const [operator, setOperator] = useState(item.operator ?? 'contains');

  const handleFilterChange = (newValue: string) => {
    setFilterValue(newValue);
    applyValue({ ...item, value: newValue, operator });
  };

  const handleOperatorChange = (newOperator: string) => {
    setOperator(newOperator);
    applyValue({ ...item, value: filterValue, operator: newOperator });
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FilterOperatorSelect value={operator} onChange={handleOperatorChange} />
      <FilterValueInput 
        value={filterValue} 
        onChange={handleFilterChange}
        inputRef={focusElementRef}
      />
    </Box>
  );
}