import { SxProps, Theme } from '@mui/material';

export const gridStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  bgcolor: '#1a1a1a',
  '& .MuiDataGrid-root': {
    border: '1px solid #333333',
    color: '#ffffff',
    '& .grid-cell': {
      borderRight: '1px solid #333333',
      borderBottom: '1px solid #333333',
      color: '#ffffff',
      backgroundColor: 'transparent',
      padding: '8px 16px',
      '&:focus': {
        outline: 'none',
      },
    },
    '& .grid-header': {
      backgroundColor: '#1a1a1a',
      borderBottom: '2px solid #333333',
      borderRight: '1px solid #333333',
      color: '#ffffff',
      padding: '8px 16px',
      '&:focus': {
        outline: 'none',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        color: '#ffffff',
        fontWeight: 600,
      },
    },
    '& .MuiDataGrid-row': {
      '&.row-modified': {
        backgroundColor: 'rgba(25, 118, 210, 0.15) !important',
      },
      '&.row-deleted': {
        backgroundColor: 'rgba(211, 47, 47, 0.15) !important',
      },
      '&.row-copied': {
        backgroundColor: 'rgba(56, 142, 60, 0.15) !important',
      },
    },
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #333333',
      borderRight: '1px solid #333333',
      color: '#ffffff',
      '&:focus': {
        outline: 'none',
      },
      '&.actions-cell': {
        backgroundColor: '#1a1a1a',
        borderRight: '2px solid #333333',
      },
      '&.id-cell': {
        backgroundColor: '#1a1a1a',
        borderRight: '2px solid #333333',
      },
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#1a1a1a',
      borderBottom: '2px solid #333333',
      color: '#ffffff',
      '& .MuiDataGrid-columnHeader': {
        '&:focus': {
          outline: 'none',
        },
        '&:last-child': {
          borderRight: '1px solid #333333',
        },
      },
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: '2px solid #333333',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
    },
    '& .MuiTablePagination-root': {
      color: '#ffffff',
    },
    '& .MuiDataGrid-cell--editing': {
      backgroundColor: '#2a2a2a',
      '& .MuiInputBase-root': {
        height: '100%',
        color: '#ffffff',
      },
      '& .MuiInputBase-input': {
        color: '#ffffff',
        padding: '0 16px',
      },
    },
    '& .MuiDataGrid-columnSeparator': {
      color: '#333333',
    },
    '& .MuiDataGrid-menuIcon': {
      color: '#ffffff',
    },
    '& .MuiDataGrid-sortIcon': {
      color: '#ffffff',
    },
    '& .MuiDataGrid-iconButtonContainer': {
      color: '#ffffff',
    },
    '& .MuiDataGrid-pinnedColumns': {
      '& .MuiDataGrid-cell': {
        backgroundColor: '#1a1a1a',
      },
      '& .MuiDataGrid-columnHeader': {
        backgroundColor: '#1a1a1a',
      },
    },
    '& .MuiDataGrid-virtualScroller': {
      backgroundColor: '#1a1a1a',
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#2a2a2a',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#4a4a4a',
        borderRadius: '4px',
        '&:hover': {
          background: '#5a5a5a',
        },
      },
    },
  },
};