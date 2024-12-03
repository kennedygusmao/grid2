"use client"

import { useCallback } from 'react';
import { GridCellParams } from '@mui/x-data-grid-premium';

export function useKeyboardSelection() {
  const handleKeyDown = useCallback((params: GridCellParams, event: React.KeyboardEvent) => {
    if (event.shiftKey) {
      event.preventDefault();
      
      const { rowIndex, colIndex } = params;
      let newRowIndex = rowIndex;
      let newColIndex = colIndex;

      switch (event.key) {
        case 'ArrowUp':
          newRowIndex = Math.max(0, rowIndex - 1);
          break;
        case 'ArrowDown':
          newRowIndex = rowIndex + 1;
          break;
        case 'ArrowLeft':
          newColIndex = Math.max(0, colIndex - 1);
          break;
        case 'ArrowRight':
          newColIndex = colIndex + 1;
          break;
      }

      return { newRowIndex, newColIndex };
    }
    return null;
  }, []);

  return { handleKeyDown };
}