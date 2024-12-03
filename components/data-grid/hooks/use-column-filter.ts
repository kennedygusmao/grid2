"use client"

import { useState, useCallback } from 'react';
import { GridFilterModel } from '@mui/x-data-grid-premium';

export function useColumnFilter() {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleFilterChange = useCallback((field: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const getFilterModel = useCallback((): GridFilterModel => {
    const items = Object.entries(filterValues)
      .filter(([_, value]) => value !== '')
      .map(([field, value]) => ({
        field,
        operator: 'contains',
        value
      }));

    return {
      items,
      quickFilterValues: [],
    };
  }, [filterValues]);

  const clearFilters = useCallback(() => {
    setFilterValues({});
  }, []);

  return {
    filterValues,
    handleFilterChange,
    getFilterModel,
    clearFilters
  };
}