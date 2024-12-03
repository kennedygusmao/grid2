"use client"

import { useState, useCallback } from 'react';
import { GridRowSelectionModel } from '@mui/x-data-grid-premium';

export function useRowSelection() {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const handleRowSelectionModelChange = useCallback((newSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newSelectionModel);
  }, []);

  const clearRowSelection = useCallback(() => {
    setRowSelectionModel([]);
  }, []);

  const isRowSelected = useCallback((id: number) => {
    return rowSelectionModel.includes(id);
  }, [rowSelectionModel]);

  return {
    rowSelectionModel,
    handleRowSelectionModelChange,
    clearRowSelection,
    isRowSelected,
  };
}