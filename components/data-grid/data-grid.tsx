"use client"

import { useEffect } from 'react';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { Box } from '@mui/material';
import { PlusCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDataGrid } from './hooks/use-data-grid';
import { columns } from './config/columns';
import { initializeMUILicense } from './config/grid-license';
import { SaveChangesModal } from './components/save-changes-modal';

export default function DataGridDemo() {
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
    rowsToDelete,
    editedRows,
    copiedRows,
    pendingChanges,
    isSaveModalOpen,
    setIsSaveModalOpen,
  } = useDataGrid();

  useEffect(() => {
    initializeMUILicense();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <div className="mb-4 flex justify-end gap-2">
        <Button
          onClick={handleSaveChanges}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!hasChanges}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button
          onClick={handleAddRow}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Row
        </Button>
      </div>
      <Box 
        sx={{ 
          height: 600, 
          width: '100%', 
          bgcolor: 'background.paper',
          '& .MuiDataGrid-root': {
            '& .MuiDataGrid-cell': {
              borderRight: '1px solid rgba(224, 224, 224, 0.2)',
            },
            '& .MuiDataGrid-columnHeader': {
              borderRight: '1px solid rgba(224, 224, 224, 0.2)',
            },
            '& .MuiDataGrid-pinnedColumns': {
              bgcolor: 'background.paper',
              borderRight: '2px solid rgba(224, 224, 224, 0.4)',
              '& .MuiDataGrid-cell': {
                bgcolor: 'background.paper',
              },
              '& .MuiDataGrid-columnHeader': {
                bgcolor: 'background.paper',
              },
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'auto !important',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
            },
          },
        }}
      >
        <DataGridPremium
          rows={rows}
          columns={columns(
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
            if (rowsToDelete.has(params.id as number)) return 'bg-red-100';
            if (editedRows.has(params.id as number)) return 'bg-green-100';
            if (copiedRows.has(params.id as number)) return 'bg-blue-100';
            return '';
          }}
          disableColumnFilter={false}
          columnBuffer={2}
          columnThreshold={2}
          pinnedColumns={{
            left: ['actions', 'id', 'lastName', 'firstName'],
          }}
          initialState={{
            pinnedColumns: {
              left: ['actions', 'id', 'lastName', 'firstName'],
            },
          }}
          sx={{
            '& .MuiDataGrid-virtualScroller': {
              scrollBehavior: 'smooth',
              overflowX: 'auto',
            },
            '& .MuiDataGrid-pinnedColumns': {
              boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
              zIndex: 1,
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