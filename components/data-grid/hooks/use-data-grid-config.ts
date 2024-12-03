"use client"

import { useState, useMemo } from 'react';
import { columns } from '../config/columns';
import { rows as initialRows } from '../data/mock-data';
import { gridConfig } from '../config/grid-config';

export function useDataGridConfig() {
  const [filterValue, setFilterValue] = useState('');

  const rows = useMemo(() => {
    if (!filterValue) return initialRows;

    return initialRows.filter((row) => {
      const searchStr = filterValue.toLowerCase();
      return Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchStr)
      );
    });
  }, [filterValue]);

  return {
    columns,
    rows,
    gridConfig,
    filterValue,
    setFilterValue,
  };
}