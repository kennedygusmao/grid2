"use client"

import { IconButton } from '@mui/material';
import { Edit2 } from 'lucide-react';
import { GridRenderCellParams } from '@mui/x-data-grid-premium';

interface EditButtonProps {
  params: GridRenderCellParams;
}

export function EditButton({ params }: EditButtonProps) {
  return (
    <IconButton
      onClick={() => {
        params.api.startRowEditMode({ id: params.id });
      }}
      size="small"
      sx={{ color: '#ffffff' }}
    >
      <Edit2 size={16} />
    </IconButton>
  );
}