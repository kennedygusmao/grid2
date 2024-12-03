"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Menu, MenuItem } from '@mui/material';

interface ExportMenuProps {
  onExportCSV: () => void;
  onExportExcel: () => void;
}

export function ExportMenu({ onExportCSV, onExportExcel }: ExportMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportCSV = () => {
    onExportCSV();
    handleClose();
  };

  const handleExportExcel = () => {
    onExportExcel();
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="bg-cyan-400 hover:bg-cyan-500 text-black font-medium"
      >
        <Download className="mr-2 h-5 w-5" />
        EXPORT
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#2a2a2a',
            color: '#ffffff',
            minWidth: 120,
            '& .MuiMenuItem-root': {
              '&:hover': {
                backgroundColor: '#3a3a3a',
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleExportCSV}>Export as CSV</MenuItem>
        <MenuItem onClick={handleExportExcel}>Export as Excel</MenuItem>
      </Menu>
    </>
  );
}