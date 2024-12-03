"use client"

import { useState, useCallback } from 'react';
import { GridCellParams } from '@mui/x-data-grid-premium';

export function useDragSelection() {
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState<GridCellParams | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  const handleMouseDown = useCallback((params: GridCellParams) => {
    if (!params.event?.ctrlKey && !params.event?.metaKey) {
      setSelectedCells(new Set());
    }
    setIsDragging(true);
    setStartCell(params);
    
    const cellId = `${params.id}-${params.field}`;
    setSelectedCells(prev => new Set([...prev, cellId]));
    
    if (params.event) {
      params.event.stopPropagation();
    }
  }, []);

  const handleMouseEnter = useCallback((params: GridCellParams) => {
    if (isDragging && startCell) {
      const startRowIndex = Math.min(startCell.rowIndex, params.rowIndex);
      const endRowIndex = Math.max(startCell.rowIndex, params.rowIndex);
      const startColIndex = Math.min(startCell.colIndex, params.colIndex);
      const endColIndex = Math.max(startCell.colIndex, params.colIndex);
      
      const newSelection = new Set<string>();
      
      for (let rowIdx = startRowIndex; rowIdx <= endRowIndex; rowIdx++) {
        for (let colIdx = startColIndex; colIdx <= endColIndex; colIdx++) {
          const rowId = params.api.getRowId(rowIdx);
          const field = params.api.getColumn(colIdx)?.field;
          if (rowId && field) {
            newSelection.add(`${rowId}-${field}`);
          }
        }
      }
      
      setSelectedCells(newSelection);
    }
  }, [isDragging, startCell]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setStartCell(null);
  }, []);

  const getSelectedCells = useCallback(() => {
    return selectedCells;
  }, [selectedCells]);

  return {
    isDragging,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    getSelectedCells,
  };
}