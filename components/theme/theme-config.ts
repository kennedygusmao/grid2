import { ThemeOptions } from '@mui/material';

export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
        }
      : {
          background: {
            default: '#121212',
            paper: '#1a1a1a',
          },
          action: {
            hover: 'rgba(255, 255, 255, 0.08)',
          },
        }),
  },
  components: {
    MuiDataGrid: {
      defaultProps: {
        sx: {
          '& .MuiDataGrid-menu': {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            '& .MuiMenuItem-root': {
              color: mode === 'dark' ? '#ffffff' : '#000000',
            },
          },
          '& .MuiDataGrid-panelWrapper': {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : '#000000',
          },
          '& .MuiDataGrid-panel': {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          },
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          color: mode === 'dark' ? '#ffffff' : '#000000',
          '& .MuiDataGrid-main': {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          },
          '& .MuiDataGrid-menuList': {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            '& .MuiMenuItem-root': {
              color: mode === 'dark' ? '#ffffff' : '#000000',
            },
          },
        },
        columnHeader: {
          backgroundColor: mode === 'dark' ? '#242424' : '#f5f5f5',
          color: mode === 'dark' ? '#ffffff' : '#000000',
          '&:hover': {
            backgroundColor: mode === 'dark' ? '#2d2d2d' : '#e5e5e5',
          },
        },
        cell: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          '&:hover': {
            backgroundColor: mode === 'dark' ? '#242424' : '#f5f5f5',
          },
        },
        row: {
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
          },
          '&:nth-of-type(odd)': {
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#fafafa',
          },
        },
        footerContainer: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          borderTop: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
        },
        virtualScroller: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
        },
        pinnedColumns: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          '& .MuiDataGrid-cell': {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: mode === 'dark' ? '#242424' : '#f5f5f5',
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          color: mode === 'dark' ? '#ffffff' : '#000000',
          '& .MuiMenuItem-root': {
            color: mode === 'dark' ? '#ffffff' : '#000000',
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#242424' : '#f5f5f5',
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          color: mode === 'dark' ? '#ffffff' : '#000000',
        },
        list: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? '#6b6b6b #2b2b2b' : '#959595 #f5f5f5',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? '#6b6b6b' : '#959595',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? '#2b2b2b' : '#f5f5f5',
          },
        },
      },
    },
  },
});