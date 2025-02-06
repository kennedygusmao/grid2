"use client"

import { GridColDef, GridFilterModel, GridValueFormatterParams, GridRenderCellParams } from '@mui/x-data-grid-premium';
import { RowActions } from '../components/row-actions';
import { DatePickerCell } from '../components/date-picker-cell';
import { ColumnMenuHeader } from '../components/column-menu/column-menu-header';
import { Select, MenuItem } from '@mui/material';
import { format } from 'date-fns';

const formatDate = (params: GridValueFormatterParams) => {
  if (!params.value) return '';
  return format(new Date(params.value), 'MM/dd/yyyy');
};

const StatusCell = (params: GridRenderCellParams) => {
  const isInEditMode = params.api.getRowMode(params.id) === 'edit';

  if (isInEditMode) {
    return (
      <Select
        value={params.value || 'Activate'}
        onChange={(e) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: e.target.value,
          });
        }}
        size="small"
        fullWidth
        variant="outlined"
        sx={{ 
          backgroundColor: '#2a2a2a',
          color: '#ffffff',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#3a3a3a',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4a4a4a',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5a5a5a',
          },
        }}
      >
        <MenuItem value="Activate">Activate</MenuItem>
        <MenuItem value="Deactivate">Deactivate</MenuItem>
      </Select>
    );
  }

  return <span className="text-white">{params.value || 'Activate'}</span>;
};

const commonColumnProps = {
  headerClassName: 'grid-header',
  cellClassName: 'grid-cell',
  flex: 1,
  minWidth: 130,
};

export const createColumns = (
  filterModel: GridFilterModel,
  setFilterModel: React.Dispatch<React.SetStateAction<GridFilterModel>>,
  onDelete: (id: number) => void,
  onCopy: (row: any) => void,
  onUndo?: (id: number) => void,
  editedRows?: Set<number>,
  rowsToDelete?: Set<number>,
  copiedRows?: Set<number>,
): GridColDef[] => {

  
  const handleFilterChange = (field: string, value: string) => {
    setFilterModel({
      ...filterModel,
      items: [
        ...filterModel.items.filter(item => item.field !== field),
        ...(value ? [{
          field,
          operator: 'contains',
          value
        }] : [])
      ]
    });
  };

  const getFilterValue = (field: string) => {
    return filterModel.items.find(item => item.field === field)?.value?.toString() || '';
  };

  return [
    {
      ...commonColumnProps,
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      flex: 0,
      sortable: false,
      filterable: false,
      editable: false,
      renderCell: (params) => (
        <RowActions 
          params={params} 
          onDelete={onDelete} 
          onCopy={onCopy}
          onUndo={onUndo}
          showUndo={
            editedRows?.has(params.id as number) || 
            rowsToDelete?.has(params.id as number) ||
            copiedRows?.has(params.id as number)
          }
        />
      ),
      renderHeader: (params) => (
        <ColumnMenuHeader {...params} showFilter={false} />
      ),
    },
    { 
      ...commonColumnProps,
      field: 'id', 
      headerName: 'ID',
      width: 90,
      flex: 0,
      editable: false,
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('id')}
          onFilterChange={(value) => handleFilterChange('id', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'desk',
      headerName: 'Desk',
      editable: true,
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('desk')}
          onFilterChange={(value) => handleFilterChange('desk', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'commodity',
      headerName: 'Commodity',
      editable: true,
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('commodity')}
          onFilterChange={(value) => handleFilterChange('commodity', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'traderName',
      headerName: 'Trader Name',
      editable: true,
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('traderName')}
          onFilterChange={(value) => handleFilterChange('traderName', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'traderEmail',
      headerName: 'Trader Email',
      editable: true,
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('traderEmail')}
          onFilterChange={(value) => handleFilterChange('traderEmail', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      editable: true,
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('quantity')}
          onFilterChange={(value) => handleFilterChange('quantity', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'status',
      headerName: 'Status',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Activate', 'Deactivate'],
      renderCell: StatusCell,
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('status')}
          onFilterChange={(value) => handleFilterChange('status', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'month',
      headerName: 'Month',
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('month')}
          onFilterChange={(value) => handleFilterChange('month', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'createdAt',
      headerName: 'Created At',
      editable: true,
      type: 'date',
      valueFormatter: formatDate,
      renderCell: (params) => (
        <DatePickerCell 
          params={params} 
          onDateChange={(id, value) => {
            params.api.setEditCellValue({
              id,
              field: 'createdAt',
              value,
            });
          }}
        />
      ),
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('createdAt')}
          onFilterChange={(value) => handleFilterChange('createdAt', value)}
        />
      ),
    },
    {
      ...commonColumnProps,
      field: 'lastModified',
      headerName: 'Last Modified',
      editable: true,
      type: 'date',
      valueFormatter: formatDate,
      renderCell: (params) => (
        <DatePickerCell 
          params={params} 
          onDateChange={(id, value) => {
            params.api.setEditCellValue({
              id,
              field: 'lastModified',
              value,
            });
          }}
        />
      ),
      renderHeader: (params) => (
        <ColumnMenuHeader
          {...params}
          filterValue={getFilterValue('lastModified')}
          onFilterChange={(value) => handleFilterChange('lastModified', value)}
        />
      ),
    },
  ];
};