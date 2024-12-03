"use client"

import { DataGridPremium, GridRowModel } from '@mui/x-data-grid-premium';
import { Box } from '@mui/material';
import { useDataGrid } from './hooks/use-data-grid';
import { createColumns } from './config/columns';
import { SaveChangesModal } from './components/save-changes-modal';
import { GridHeader } from './components/grid-header';
import { gridStyles } from './styles/grid-styles';
import { exportToCSV, exportToExcel } from './utils/export';

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
          disableMultipleSelection={false}
          autoHeight={false}
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