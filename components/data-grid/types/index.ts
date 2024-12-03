export interface DataGridColumn {
  field: string;
  headerName: string;
  width?: number;
  editable?: boolean;
  type?: string;
  valueOptions?: string[];
}

export interface DataGridRow {
  id: number;
  [key: string]: any;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  rows: DataGridRow[];
  title?: string;
  onSave?: (rows: DataGridRow[]) => void;
  className?: string;
}