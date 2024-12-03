"use client"

import { useState, useCallback } from 'react';

export function useSelection() {
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  const addCell = useCallback((cellId: string) => {
    setSelectedCells(prev => new Set([...prev, cellId]));
  }, []);

  const removeCell = useCallback((cellId: string) => {
    setSelectedCells(prev => {
      const newSelection = new Set(prev);
      newSelection.delete(cellId);
      return newSelection;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCells(new Set());
  }, []);

  const setSelection = useCallback((cells: Set<string>) => {
    setSelectedCells(cells);
  }, []);

  return {
    selectedCells,
    addCell,
    removeCell,
    clearSelection,
    setSelection,
  };
}