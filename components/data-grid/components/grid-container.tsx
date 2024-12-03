"use client"

import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface GridContainerProps {
  children: ReactNode;
  className?: string;
}

const gridStyles: SxProps<Theme> = {
  height: 600,
  width: '100%',
  bgcolor: 'background.paper',
  '& .MuiDataGrid-root': {
    '& .MuiDataGrid-cell': {
      borderRight: '1px solid rgba(224, 224, 224, 0.2)',
      cursor: 'pointer',
      '&:focus': {
        outline: 'none',
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    '& .MuiDataGrid-columnHeader': {
      borderRight: '1px solid rgba(224, 224, 224, 0.2)',
    },
    '& .MuiDataGrid-pinnedColumns': {
      bgcolor: 'background.paper',
      borderRight: '2px solid rgba(224, 224, 224, 0.4)',
      zIndex: 3,
    },
  },
};

export function GridContainer({ children, className }: GridContainerProps) {
  return (
    <Box sx={gridStyles} className={className}>
      {children}
    </Box>
  );
}