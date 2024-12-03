"use client"

import { useCallback } from 'react';
import { GridApi } from '@mui/x-data-grid-premium';

export function useClipboard() {
  const parseClipboardData = (text: string) => {
    return text.split('\n')
      .filter(line => line.trim())
      .map(line => line.split('\t'));
  };

  const handlePaste = useCallback((event: ClipboardEvent) => {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text');
    if (!clipboardData) return;

    const selectedElements = document.querySelectorAll('.MuiDataGrid-cell--selected');
    if (!selectedElements.length) return;

    const parsedData = parseClipboardData(clipboardData);
    const startCell = selectedElements[0];
    const gridElement = startCell.closest('.MuiDataGrid-root');
    
    if (!gridElement) return;

    const api = (gridElement as any).gridApi as GridApi;
    if (!api) return;

    const startRowId = startCell.getAttribute('data-id');
    const startField = startCell.getAttribute('data-field');
    
    if (!startRowId || !startField) return;

    const columnFields = api.getAllColumns().map(col => col.field);
    const startColIndex = columnFields.indexOf(startField);

    parsedData.forEach((rowData, rowOffset) => {
      const currentRowIndex = api.getRowIndex(startRowId) + rowOffset;
      const currentRowId = api.getRowId(currentRowIndex);
      if (!currentRowId) return;

      rowData.forEach((cellData, colOffset) => {
        const field = columnFields[startColIndex + colOffset];
        if (!field) return;

        api.setEditCellValue({
          id: currentRowId,
          field,
          value: cellData.trim(),
        });
      });
    });
  }, []);

  return { handlePaste };
}