import { SxProps, Theme } from '@mui/material';

export const gridStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  bgcolor: '#1a1a1a',
  borderRadius: '8px',
  overflow: 'hidden',
  '& .MuiDataGrid-root': {
    border: '1px solid #333333',
    color: '#ffffff',
    transition: 'all 0.2s ease',
    '& .grid-cell': {
      borderRight: '1px solid rgba(51, 51, 51, 0.5)',
      borderBottom: '1px solid rgba(51, 51, 51, 0.5)',
      color: '#ffffff',
      backgroundColor: 'transparent',
      padding: '12px 16px',
      transition: 'background-color 0.15s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
    },
    '& .grid-header': {
      backgroundColor: '#242424',
      borderBottom: '2px solid #404040',
      borderRight: '1px solid rgba(51, 51, 51, 0.5)',
      color: '#ffffff',
      padding: '14px 16px',
      transition: 'background-color 0.15s ease',
      '&:hover': {
        backgroundColor: '#2a2a2a',
      },
      '&:focus': {
        outline: 'none',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        color: '#ffffff',
        fontWeight: 600,
        fontSize: '0.95rem',
        letterSpacing: '0.01em',
      },
    },
    '& .MuiDataGrid-row': {
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
      },
      '&.row-modified': {
        backgroundColor: 'rgba(25, 118, 210, 0.12) !important',
      },
      '&.row-deleted': {
        backgroundColor: 'rgba(211, 47, 47, 0.12) !important',
      },
      '&.row-copied': {
        backgroundColor: 'rgba(56, 142, 60, 0.12) !important',
      },
      '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
      },
    },
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid rgba(51, 51, 51, 0.5)',
      borderRight: '1px solid rgba(51, 51, 51, 0.5)',
      color: '#ffffff',
      padding: '12px 16px',
      transition: 'all 0.15s ease',
      '&:focus': {
        outline: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
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