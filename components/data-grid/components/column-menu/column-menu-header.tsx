"use client"

import { Box } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { GridColumnHeaderParams } from '@mui/x-data-grid-premium';
import { ColumnMenuFilter } from './column-menu-filter';

interface ColumnMenuHeaderProps extends GridColumnHeaderParams {
  showFilter?: boolean;
  onFilterChange?: (value: string) => void;
  filterValue?: string;
}

export function ColumnMenuHeader(props: ColumnMenuHeaderProps) {
  const { 
    colDef, 
    showFilter = true, 
    onFilterChange,
    filterValue = ''
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        color: '#ffffff',
        padding: '0 8px',
        '& .header-content': {
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '0.875rem',
        },
        '& .header-icon': {
          color: '#ffffff',
          opacity: 0.7,
          transition: 'opacity 0.2s',
          '&:hover': {
            opacity: 1,
          },
        },
      }}
    >
      <Box className="header-content">
        {colDef.headerName}
        <ChevronDown className="header-icon" size={16} />
      </Box>
      {showFilter && colDef.filterable && onFilterChange && (
        <ColumnMenuFilter
          field={colDef.field}
          value={filterValue}
          onChange={onFilterChange}
          type={colDef.type === 'number' ? 'number' : 'text'}
        />
      )}
    </Box>
  );
}