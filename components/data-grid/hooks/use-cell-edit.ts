"use client"

import { useCallback } from 'react';
import { GridCellParams } from '@mui/x-data-grid-premium';
import { EDITABLE_FIELDS } from '@/lib/constants';

export function useCellEdit() {
  const handleCellClick = useCallback((params: GridCellParams) => {
    if (EDITABLE_FIELDS.includes(params.field) && params.api) {
      params.api.startCellEditMode({ id: params.id, field: params.field });
    }
  }, []);

  const handleCellEditStop = useCallback((params: GridCellParams) => {
    if (params.api) {
      params.api.stopCellEditMode({ id: params.id, field: params.field });
    }
  }, []);

  return {
    handleCellClick,
    handleCellEditStop
  };
}