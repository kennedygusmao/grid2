"use client"

import { Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Button } from '@/components/ui/button';
import { GridRowModel } from '@mui/x-data-grid-premium';

interface SaveChangesModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  editedRows: Set<number>;
  deletedRows: Set<number>;
  copiedRows: Set<number>;
  pendingChanges: Map<number, GridRowModel>;
  rows: GridRowModel[];
}

export function SaveChangesModal({
  open,
  onClose,
  onConfirm,
  editedRows,
  deletedRows,
  copiedRows,
  pendingChanges,
  rows,
}: SaveChangesModalProps) {
  const getRowById = (id: number) => rows.find(row => row.id === id);
  const columnHeaders = ['ID', 'First Name', 'Last Name', 'Age', 'Email', 'Role', 'Status', 'Month'];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          bgcolor: 'background.paper',
        }
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        Confirm Changes
      </DialogTitle>
      <DialogContent dividers>
        {copiedRows.size > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              New Copied Rows:
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4, backgroundColor: 'primary.main', color: 'white' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columnHeaders.map((header) => (
                      <TableCell key={header} sx={{ color: 'white', fontWeight: 600 }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(copiedRows).map(id => {
                    const row = getRowById(id);
                    if (!row) return null;

                    return (
                      <TableRow key={id}>
                        <TableCell sx={{ color: 'white' }}>{row.id}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.firstName}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.lastName}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.age}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.email}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.role}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.status}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.month}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {editedRows.size > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Modified Rows:
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columnHeaders.map((header) => (
                      <TableCell key={header} sx={{ fontWeight: 600 }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(editedRows).map(id => {
                    const originalRow = getRowById(id);
                    const modifiedRow = pendingChanges.get(id);
                    if (!originalRow || !modifiedRow) return null;

                    return (
                      <TableRow key={id}>
                        <TableCell>{originalRow.id}</TableCell>
                        <TableCell>
                          {originalRow.firstName !== modifiedRow.firstName ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#dc2626' }}>
                                {originalRow.firstName}
                              </span>
                              <span style={{ color: '#059669' }}> → {modifiedRow.firstName}</span>
                            </>
                          ) : originalRow.firstName}
                        </TableCell>
                        <TableCell>
                          {originalRow.lastName !== modifiedRow.lastName ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#dc2626' }}>
                                {originalRow.lastName}
                              </span>
                              <span style={{ color: '#059669' }}> → {modifiedRow.lastName}</span>
                            </>
                          ) : originalRow.lastName}
                        </TableCell>
                        <TableCell>
                          {originalRow.age !== modifiedRow.age ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#dc2626' }}>
                                {originalRow.age}
                              </span>
                              <span style={{ color: '#059669' }}> → {modifiedRow.age}</span>
                            </>
                          ) : originalRow.age}
                        </TableCell>
                        <TableCell>
                          {originalRow.email !== modifiedRow.email ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#dc2626' }}>
                                {originalRow.email}
                              </span>
                              <span style={{ color: '#059669' }}> → {modifiedRow.email}</span>
                            </>
                          ) : originalRow.email}
                        </TableCell>
                        <TableCell>
                          {originalRow.role !== modifiedRow.role ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#dc2626' }}>
                                {originalRow.role}
                              </span>
                              <span style={{ color: '#059669' }}> → {modifiedRow.role}</span>
                            </>
                          ) : originalRow.role}
                        </TableCell>
                        <TableCell>
                          {originalRow.status !== modifiedRow.status ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#dc2626' }}>
                                {originalRow.status}
                              </span>
                              <span style={{ color: '#059669' }}> → {modifiedRow.status}</span>
                            </>
                          ) : originalRow.status}
                        </TableCell>
                        <TableCell>
                          {originalRow.month !== modifiedRow.month ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#dc2626' }}>
                                {originalRow.month}
                              </span>
                              <span style={{ color: '#059669' }}> → {modifiedRow.month}</span>
                            </>
                          ) : originalRow.month}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {deletedRows.size > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Rows to Delete:
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4, backgroundColor: '#dc2626' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columnHeaders.map((header) => (
                      <TableCell key={header} sx={{ color: 'white', fontWeight: 600 }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(deletedRows).map(id => {
                    const row = getRowById(id);
                    if (!row) return null;

                    return (
                      <TableRow key={id}>
                        <TableCell sx={{ color: 'white' }}>{row.id}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.firstName}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.lastName}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.age}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.email}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.role}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.status}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{row.month}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {editedRows.size === 0 && deletedRows.size === 0 && copiedRows.size === 0 && (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 2 }}>
            No changes to save
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="outline"
          onClick={onClose}
          className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Confirm Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}