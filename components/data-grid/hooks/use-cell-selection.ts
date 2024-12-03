"use client"

import { useState, useCallback } from 'react';
import { GridCellParams } from '@mui/x-data-grid-premium';

export interface CellSelectionModel {
  [rowId: string]: {
    [field: string]: boolean;
  };
}

export function useCellSelection() {
  const [cellSelectionModel, setCellSelectionModel] = useState<CellSelectionModel>({});

  const handleCellSelection = useCallback((params: GridCellParams, event: React.MouseEvent) => {
    const rowId = params.id.toString();
    const field = params.field;

    setCellSelectionModel((prev) => {
      const newModel = { ...prev };

      if (event.shiftKey) {
        // Add to selection
        if (!newModel[rowId]) {
          newModel[rowId] = {};
        }
        newModel[rowId][field] = true;
      } else {
        // Replace selection
        return {
          [rowId]: {
            [field]: true
          }
        };
      }

      return newModel;
    });
  }, []);

  const handleRangeSelection = useCallback((startParams: GridCellParams, endParams: GridCellParams) => {
    const startRowIndex = Math.min(startParams.rowIndex, endParams.rowIndex);
    const endRowIndex = Math.max(startParams.rowIndex, endParams.rowIndex);
    const startColIndex = Math.min(startParams.colIndex, endParams.colIndex);
    const endColIndex = Math.max(startParams.colIndex, endParams.colIndex);

    const newModel: CellSelectionModel = {};
    
    for (let rowIdx = startRowIndex; rowIdx <= endRowIndex; rowIdx++) {
      const rowId = startParams.api.getRowId(rowIdx)?.toString();
      if (rowId) {
        newModel[rowId] = {};
        for (let colIdx = startColIndex; colIdx <= endColIndex; colIdx++) {
          const field = startParams.api.getColumn(colIdx)?.field;
          if (field) {
            newModel[rowId][field] = true;
          }
        }
      }
    }

    setCellSelectionModel(newModel);
  }, []);

  const clearSelection = useCallback(() => {
    setCellSelectionModel({});
  }, []);

  return {
    cellSelectionModel,
    handleCellSelection,
    handleRangeSelection,
    clearSelection,
  };
}