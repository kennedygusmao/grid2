export const filterOperators = [
  { label: 'Contains', value: 'contains' },
  { label: 'Equals', value: 'equals' },
  { label: 'Starts with', value: 'startsWith' },
  { label: 'Ends with', value: 'endsWith' },
] as const;

export type FilterOperator = typeof filterOperators[number]['value'];

export function applyFilterOperation(
  cellValue: any,
  searchValue: string,
  operator: FilterOperator
): boolean {
  if (!cellValue) return false;
  
  const normalizedCellValue = cellValue.toString().toLowerCase();
  const normalizedSearchValue = searchValue.toLowerCase();

  switch (operator) {
    case 'contains':
      return normalizedCellValue.includes(normalizedSearchValue);
    case 'equals':
      return normalizedCellValue === normalizedSearchValue;
    case 'startsWith':
      return normalizedCellValue.startsWith(normalizedSearchValue);
    case 'endsWith':
      return normalizedCellValue.endsWith(normalizedSearchValue);
    default:
      return true;
  }
}