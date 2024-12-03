"use client"

import { GridInitialState } from '@mui/x-data-grid-premium';

export const initialState: GridInitialState = {
  pagination: {
    paginationModel: {
      pageSize: 25,
    },
  },
  pinnedColumns: {
    left: ['actions', 'id', 'desk', 'commodity'],
  },
};

export const gridConfig = {
  initialState,
  pageSizeOptions: [25, 50, 100],
  checkboxSelection: false,
  disableRowSelectionOnClick: true,
  disableColumnMenu: false,
  disableDensitySelector: true,
  disableColumnSelector: true,
  editMode: "cell",
  columnBuffer: 2,
  columnThreshold: 2,
  experimentalFeatures: { newEditingApi: true },
  density: "standard",
  showCellVerticalBorder: true,
  showColumnVerticalBorder: true,
  getCellClassName: (params: any) => {
    if (params.isSelected) {
      return 'selected-cell';
    }
    return '';
  },
};