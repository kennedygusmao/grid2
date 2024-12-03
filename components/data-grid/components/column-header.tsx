"use client"

import { Box, IconButton } from '@mui/material';
import { ChevronDown, Filter } from 'lucide-react';
import { GridColumnHeaderParams } from '@mui/x-data-grid-premium';

interface ColumnHeaderProps extends GridColumnHeaderParams {
  showFilter?: boolean;
}

export function ColumnHeader(props: ColumnHeaderProps) {
  const { colDef, showFilter = true } = props;

  const handleFilterClick = () => {
    const filterButtonEl = document.querySelector(`[data-field="${colDef.field}"] .MuiDataGrid-menuIcon`);
    if (filterButtonEl instanceof HTMLElement) {
      filterButtonEl.click();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {colDef.headerName}
        <ChevronDown size={16} />
      </Box>
      {showFilter && colDef.filterable && (
        <IconButton 
          size="small" 
          sx={{ ml: 1 }}
          onClick={handleFilterClick}
        >
          <Filter size={16} />
        </IconButton>
      )}
    </Box>
  );
}