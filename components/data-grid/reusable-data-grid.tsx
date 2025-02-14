"use client"

import { DataGridPremium, GridRowModel } from '@mui/x-data-grid-premium';
import { Box } from '@mui/material';
import { useDataGrid } from './hooks/use-data-grid';
import { createColumns } from './config/columns';
import { SaveChangesModal } from './components/save-changes-modal';
import { GridHeader } from './components/grid-header';
import { gridStyles } from './styles/grid-styles';
import { exportToCSV, exportToExcel } from './utils/export';
import { useTheme } from '@mui/material/styles';

interface ReusableDataGridProps {
  title?: string;
  onSave?: (rows: GridRowModel[]) => void;
  className?: string;
}

export function ReusableDataGrid({ 
  title = 'Data Grid',
  onSave,
  className 
}: ReusableDataGridProps) {
  const theme = useTheme();
  
  console.log('Current theme:', theme);
  console.log('Theme palette:', theme?.palette);

  if (!theme) {
    console.error('Theme is not available');
    return null;
  }

  const {
    rows,
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
  } = useDataGrid();

  const handleSearch = (value: string) => {
    setFilterModel({
      ...filterModel,
      quickFilterValues: [value],
    });
  };

  const handleReset = () => {
    setFilterModel({
      items: [],
      quickFilterValues: [],
    });
    handleYearChange([]);
  };

  const handleRefresh = () => {
    handleReset();
  };

  const handleExportCSV = () => {
    exportToCSV(rows, 'data-grid-export');
  };

  const handleExportExcel = () => {
    exportToExcel(rows, 'data-grid-export');
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }} className={className}>
      <GridHeader
        onSearch={handleSearch}
        onYearChange={handleYearChange}
        onReset={handleReset}
        onSave={handleSaveChanges}
        onCancel={handleCancel}
        onRefresh={handleRefresh}
        onAddRecord={handleAddRow}
        onExportCSV={handleExportCSV}
        onExportExcel={handleExportExcel}
        selectedYears={selectedYears}
      />

      <Box sx={{ ...gridStyles, height: 'calc(100% - 180px)', mt: 2 }}>
        <DataGridPremium
          rows={rows}
          columns={createColumns(
            filterModel, 
            setFilterModel, 
            handleMarkForDeletion, 
            handleCopyRow,
            handleUndoChanges,
            editedRows,
            rowsToDelete,
            copiedRows
          )}
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          processRowUpdate={(newRow) => {
            handleRowModification(newRow);
            return newRow;
          }}
          getRowClassName={(params) => {
            if (rowsToDelete.has(params.id as number)) return 'row-deleted';
            if (editedRows.has(params.id as number)) return 'row-modified';
            if (copiedRows.has(params.id as number)) return 'row-copied';
            return '';
          }}
          getCellClassName={(params) => {
            if (params.field === 'actions') return 'actions-cell';
            if (params.field === 'id') return 'id-cell';
            return 'grid-cell';
          }}
          editMode="row"
          disableColumnFilter={false}
          columnBuffer={2}
          columnThreshold={2}
          pinnedColumns={{
            left: ['actions', 'id'],
          }}
          initialState={{
            pinnedColumns: {
              left: ['actions', 'id'],
            },
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
            columns: {
              columnVisibilityModel: {},
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          disableRowSelectionOnClick
          // disableMultipleSelection={false}
          autoHeight={false}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderColor: theme.palette.divider,
            '& .MuiDataGrid-cell': {
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
              padding: '8px 16px',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderBottom: `1px solid ${theme.palette.divider}`,
              fontWeight: 'bold',
              '& .MuiDataGrid-columnHeader': {
                padding: '12px 16px',
              },
            },
            '& .MuiDataGrid-row': {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
              '&:hover': {
                backgroundColor: theme.palette.action.selected,
              },
              '&.row-deleted': {
                backgroundColor: `${theme.palette.error.main}20`,
                '&:hover': {
                  backgroundColor: `${theme.palette.error.main}30`,
                },
              },
              '&.row-modified': {
                backgroundColor: `${theme.palette.warning.main}20`,
                '&:hover': {
                  backgroundColor: `${theme.palette.warning.main}30`,
                },
              },
              '&.row-copied': {
                backgroundColor: `${theme.palette.success.main}20`,
                '&:hover': {
                  backgroundColor: `${theme.palette.success.main}30`,
                },
              },
            },
            '& .actions-cell': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              '& .MuiButtonBase-root': {
                padding: '4px',
                minWidth: 'unset',
                '&.edit-button': {
                  color: theme.palette.primary.main,
                },
                '&.delete-button': {
                  color: theme.palette.error.main,
                },
                '&.copy-button': {
                  color: theme.palette.success.main,
                },
                '&.save-button': {
                  color: theme.palette.success.main,
                },
                '&.cancel-button': {
                  color: theme.palette.error.main,
                },
                '&:hover': {
                  backgroundColor: `${theme.palette.action.hover}80`,
                },
              },
            },
            '& .id-cell': {
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            },
            '& .grid-cell': {
              fontSize: '14px',
            },
            '& .MuiDataGrid-toolbar': {
              backgroundColor: theme.palette.background.paper,
              borderBottom: `1px solid ${theme.palette.divider}`,
              padding: '8px 16px',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
            },
          }}
        />
      </Box>

      <SaveChangesModal
        open={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        editedRows={editedRows}
        deletedRows={rowsToDelete}
        copiedRows={copiedRows}
        pendingChanges={pendingChanges}
        rows={rows}
      />
    </Box>
  );
}