"use client"

import { IconButton, Box } from '@mui/material';
import { Trash2, Copy, RotateCcw } from 'lucide-react';
import { GridRenderCellParams } from '@mui/x-data-grid-premium';

interface RowActionsProps {
  params: GridRenderCellParams;
  onDelete: (id: number) => void;
  onCopy: (row: any) => void;
  onUndo?: (id: number) => void;
  showUndo?: boolean;
}

export function RowActions({ params, onDelete, onCopy, onUndo, showUndo }: RowActionsProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(params.id as number);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(params.row);
  };

  const handleUndo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUndo) {
      onUndo(params.id as number);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {showUndo && onUndo && (
        <IconButton
          onClick={handleUndo}
          size="small"
          sx={{ color: '#000000' }}
        >
          <RotateCcw size={16} />
        </IconButton>
      )}
      <IconButton
        onClick={handleCopy}
        size="small"
        sx={{ color: '#000000' }}
      >
        <Copy size={16} />
      </IconButton>
      <IconButton
        onClick={handleDelete}
        size="small"
        sx={{ color: '#000000' }}
      >
        <Trash2 size={16} />
      </IconButton>
    </Box>
  );
}