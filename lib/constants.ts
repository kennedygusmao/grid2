// Grid configuration constants
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
export const DEFAULT_PAGE_SIZE = 5;

// Grid column configuration
export const EDITABLE_FIELDS = [
  'firstName', 
  'lastName', 
  'age', 
  'email', 
  'role', 
  'status', 
  'month', 
  'createdAt',
  'lastModified'
];

export const PINNED_COLUMNS = ['actions', 'id', 'lastName', 'firstName'];

// Grid cell editing configuration
export const CELL_EDIT_COMMIT_DELAY = 500;

// MUI X License Key
export const MUI_LICENSE_KEY = process.env.NEXT_PUBLIC_MUI_LICENSE_KEY || 'test-license-1234';