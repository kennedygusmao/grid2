import { GridFilterOperator } from '@mui/x-data-grid-premium';
import { CustomFilterInput } from '../components/custom-filter';
import { applyFilterOperation } from './filter-operators';

export function createCustomFilterOperator(): GridFilterOperator {
  return {
    label: 'Custom Filter',
    value: 'custom',
    InputComponent: CustomFilterInput,
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }

      return ({ value }) => {
        if (!value) {
          return false;
        }

        return applyFilterOperation(
          value,
          filterItem.value.toString(),
          filterItem.operator as any
        );
      };
    },
  };
}