"use client"

import { useCallback } from 'react';
import { GridCellParams } from '@mui/x-data-grid-premium';

export function useKeyboardNavigation() {
  const handleKeyDown = useCallback((params: GridCellParams, event: React.KeyboardEvent) => {
    const { api, id, field } = params;
    
    if (!api) return;

    const columns = api.getAllColumns();
    const currentColumnIndex = columns.findIndex(col => col.field === field);
    const currentRowIndex = api.getRowIndex(id);
    
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        if (event.shiftKey) {
          // Move left
          if (currentColumnIndex > 0) {
            const prevField = columns[currentColumnIndex - 1].field;
            api.setCellFocus(id, prevField);
          } else if (currentRowIndex > 0) {
            // Move to end of previous row
            const prevRowId = api.getRowId(currentRowIndex - 1);
            if (prevRowId) {
              const lastField = columns[columns.length - 1].field;
              api.setCellFocus(prevRowId, lastField);
            }
          }
        } else {
          // Move right
          if (currentColumnIndex < columns.length - 1) {
            const nextField = columns[currentColumnIndex + 1].field;
            api.setCellFocus(id, nextField);
          } else if (currentRowIndex < api.getRowsCount() - 1) {
            // Move to start of next row
            const nextRowId = api.getRowId(currentRowIndex + 1);
            if (nextRowId) {
              const firstField = columns[0].field;
              api.setCellFocus(nextRowId, firstField);
            }
          }
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (event.shiftKey) {
          // Move up
          if (currentRowIndex > 0) {
            const prevRowId = api.getRowId(currentRowIndex - 1);
            if (prevRowId) {
              api.setCellFocus(prevRowId, field);
            }
          }
        } else {
          // Move down
          if (currentRowIndex < api.getRowsCount() - 1) {
            const nextRowId = api.getRowId(currentRowIndex + 1);
            if (nextRowId) {
              api.setCellFocus(nextRowId, field);
            }
          }
        }
        break;

      case 'ArrowLeft':
        if (currentColumnIndex > 0) {
          const prevField = columns[currentColumnIndex - 1].field;
          api.setCellFocus(id, prevField);
        }
        break;

      case 'ArrowRight':
        if (currentColumnIndex < columns.length - 1) {
          const nextField = columns[currentColumnIndex + 1].field;
          api.setCellFocus(id, nextField);
        }
        break;

      case 'ArrowUp':
        if (currentRowIndex > 0) {
          const prevRowId = api.getRowId(currentRowIndex - 1);
          if (prevRowId) {
            api.setCellFocus(prevRowId, field);
          }
        }
        break;

      case 'ArrowDown':
        if (currentRowIndex < api.getRowsCount() - 1) {
          const nextRowId = api.getRowId(currentRowIndex + 1);
          if (nextRowId) {
            api.setCellFocus(nextRowId, field);
          }
        }
        break;
    }
  }, []);

  return { handleKeyDown };
}