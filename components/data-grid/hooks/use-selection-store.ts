"use client"

import { create } from 'zustand';

interface SelectionState {
  selectedCells: Set<string>;
  addCell: (cellId: string) => void;
  removeCell: (cellId: string) => void;
  clearSelection: () => void;
  setSelection: (cells: Set<string>) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedCells: new Set(),
  addCell: (cellId) => set((state) => ({
    selectedCells: new Set([...state.selectedCells, cellId])
  })),
  removeCell: (cellId) => set((state) => {
    const newSelection = new Set(state.selectedCells);
    newSelection.delete(cellId);
    return { selectedCells: newSelection };
  }),
  clearSelection: () => set({ selectedCells: new Set() }),
  setSelection: (cells) => set({ selectedCells: cells }),
}));