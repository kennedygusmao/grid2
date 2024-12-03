"use client"

import { useState, useCallback } from 'react';
import { GridFilterModel, GridRowModel, GridRowModesModel } from '@mui/x-data-grid-premium';
import { rows as defaultRows } from '../data/mock-data';
import dayjs from 'dayjs';

export function useDataGrid(initialRows = defaultRows) {
  const [rows, setRows] = useState(initialRows);
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [rowsToDelete, setRowsToDelete] = useState<Set<number>>(new Set());
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [editedRows, setEditedRows] = useState<Set<number>>(new Set());
  const [copiedRows, setCopiedRows] = useState<Set<number>>(new Set());
  const [pendingChanges, setPendingChanges] = useState<Map<number, GridRowModel>>(new Map());
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [originalRows] = useState<Map<number, GridRowModel>>(
    new Map(initialRows.map(row => [row.id as number, { ...row }]))
  );

  const handleCancel = useCallback(() => {
    // Restore original rows
    const restoredRows = Array.from(originalRows.values());
    setRows(restoredRows);
    
    // Reset filtered rows based on year filter
    if (selectedYears.length === 0) {
      setFilteredRows(restoredRows);
    } else {
      const filtered = restoredRows.filter(row => {
        const rowYear = dayjs(row.createdAt).year().toString();
        return selectedYears.includes(rowYear);
      });
      setFilteredRows(filtered);
    }

    // Clear all change tracking states
    setRowsToDelete(new Set());
    setEditedRows(new Set());
    setCopiedRows(new Set());
    setPendingChanges(new Map());
    setHasChanges(false);
    setRowModesModel({});
  }, [originalRows, selectedYears]);

  const handleMarkForDeletion = useCallback((id: number) => {
    setRowsToDelete(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    setHasChanges(true);
  }, []);

  const handleCopyRow = useCallback((rowToCopy: GridRowModel) => {
    const newId = Math.max(...rows.map(row => row.id as number)) + 1;
    const now = new Date().toISOString();
    const newRow = {
      ...rowToCopy,
      id: newId,
      createdAt: now,
      lastModified: now,
    };
    
    setRows(prevRows => [newRow, ...prevRows]);
    setCopiedRows(prev => new Set(prev).add(newId));
    setHasChanges(true);

    if (selectedYears.length === 0) {
      setFilteredRows(prevRows => [newRow, ...prevRows]);
    } else {
      const newRowYear = dayjs(newRow.createdAt).year().toString();
      if (selectedYears.includes(newRowYear)) {
        setFilteredRows(prevRows => [newRow, ...prevRows]);
      }
    }
  }, [rows, selectedYears]);

  const handleRowModification = useCallback((updatedRow: GridRowModel) => {
    const now = new Date().toISOString();
    const modifiedRow = {
      ...updatedRow,
      lastModified: now,
    };
    
    setPendingChanges(prev => {
      const newMap = new Map(prev);
      newMap.set(modifiedRow.id as number, modifiedRow);
      return newMap;
    });
    
    setEditedRows(prev => {
      const newSet = new Set(prev);
      newSet.add(modifiedRow.id as number);
      return newSet;
    });
    
    setHasChanges(true);
    
    setRows(prevRows => 
      prevRows.map(row => 
        row.id === modifiedRow.id ? modifiedRow : row
      )
    );

    if (selectedYears.length === 0) {
      setFilteredRows(prevRows =>
        prevRows.map(row =>
          row.id === modifiedRow.id ? modifiedRow : row
        )
      );
    } else {
      const rowYear = dayjs(modifiedRow.createdAt).year().toString();
      if (selectedYears.includes(rowYear)) {
        setFilteredRows(prevRows =>
          prevRows.map(row =>
            row.id === modifiedRow.id ? modifiedRow : row
          )
        );
      }
    }

    return modifiedRow;
  }, [selectedYears]);

  const handleAddRow = useCallback(() => {
    const newId = Math.max(...rows.map(row => row.id as number)) + 1;
    const now = new Date().toISOString();
    const currentMonth = dayjs().format('MMMM');
    
    const newRow: GridRowModel = {
      id: newId,
      desk: '',
      commodity: '',
      traderName: '',
      traderEmail: '',
      quantity: null,
      status: 'Activate',
      month: currentMonth,
      createdAt: now,
      lastModified: now,
    };
    
    setRows(prevRows => [newRow, ...prevRows]);
    setEditedRows(prev => new Set(prev).add(newId));
    setHasChanges(true);

    if (selectedYears.length === 0) {
      setFilteredRows(prevRows => [newRow, ...prevRows]);
    } else {
      const newRowYear = dayjs(newRow.createdAt).year().toString();
      if (selectedYears.includes(newRowYear)) {
        setFilteredRows(prevRows => [newRow, ...prevRows]);
      }
    }
  }, [rows, selectedYears]);

  const handleSaveChanges = useCallback(() => {
    setIsSaveModalOpen(true);
  }, []);

  const handleConfirmSave = useCallback(() => {
    setRows(prevRows => {
      const updatedRows = prevRows
        .filter(row => !rowsToDelete.has(row.id as number))
        .map(row => {
          const pendingChange = pendingChanges.get(row.id as number);
          return pendingChange || row;
        });
      return updatedRows;
    });

    setFilteredRows(prevRows => {
      const updatedRows = prevRows
        .filter(row => !rowsToDelete.has(row.id as number))
        .map(row => {
          const pendingChange = pendingChanges.get(row.id as number);
          return pendingChange || row;
        });
      return updatedRows;
    });

    setRowsToDelete(new Set());
    setEditedRows(new Set());
    setCopiedRows(new Set());
    setPendingChanges(new Map());
    setHasChanges(false);
    setRowModesModel({});
    setIsSaveModalOpen(false);
  }, [rowsToDelete, pendingChanges]);

  const handleUndoChanges = useCallback((id: number) => {
    if (copiedRows.has(id)) {
      setRows(prevRows => prevRows.filter(row => row.id !== id));
      setFilteredRows(prevRows => prevRows.filter(row => row.id !== id));
      setCopiedRows(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } else {
      const originalRow = originalRows.get(id);
      if (originalRow) {
        setEditedRows(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        setRowsToDelete(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        setPendingChanges(prev => {
          const newMap = new Map(prev);
          newMap.delete(id);
          return newMap;
        });
        setRows(prevRows => 
          prevRows.map(row => 
            row.id === id ? { ...originalRow } : row
          )
        );
        setFilteredRows(prevRows => 
          prevRows.map(row => 
            row.id === id ? { ...originalRow } : row
          )
        );
      }
    }

    const stillHasChanges = 
      editedRows.size > 0 || 
      rowsToDelete.size > 0 || 
      copiedRows.size > 0 || 
      pendingChanges.size > 0;
    
    setHasChanges(stillHasChanges);
  }, [copiedRows, originalRows]);

  const handleYearChange = useCallback((years: string[]) => {
    setSelectedYears(years);
    if (years.length === 0) {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter(row => {
        const rowYear = dayjs(row.createdAt).year().toString();
        return years.includes(rowYear);
      });
      setFilteredRows(filtered);
    }
  }, [rows]);

  return {
    rows: filteredRows,
    filterModel,
    setFilterModel,
    rowModesModel,
    setRowModesModel,
    hasChanges,
    handleMarkForDeletion,
    handleCopyRow,
    handleRowModification,
    handleAddRow,
    handleSaveChanges,
    handleConfirmSave,
    handleUndoChanges,
    handleYearChange,
    handleCancel,
    rowsToDelete,
    editedRows,
    copiedRows,
    pendingChanges,
    isSaveModalOpen,
    setIsSaveModalOpen,
    selectedYears,
  };
}