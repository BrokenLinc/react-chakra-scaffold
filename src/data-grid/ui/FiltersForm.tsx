import { SearchInputFilter } from '@@api/types';
import { squishObject } from '@@helpers/squishObject';
import * as UI from '@@ui';
import _ from 'lodash';
import React from 'react';

// Converts nested form data into a flat array of filters that can be sent to the API
// Field names must use the format: "operator:field" or "operator:entity.field".
const getSearchInputFiltersFromFormValues = (values: object) => {
  const compactFlatValues = squishObject(values);
  const filters = _.map(compactFlatValues, (value, name) => {
    const [operator, field] = name.split(':');

    if (value === 'NULL') {
      if (operator === 'eq') {
        return {
          field,
          operator: 'isnull',
          value,
        };
      }
      if (operator === '!eq') {
        return {
          field,
          operator: 'isnotnull',
          value,
        };
      }
    }

    return {
      field,
      value,
      operator,
    };
  });
  return filters as SearchInputFilter[];
};

// Converts a flat array of API-formatted filters into nested form data
// Field names will use the format: "operator:field" or "operator:entity.field".
const getFormValuesFromSearchInputFilters = (
  filters: SearchInputFilter[] = []
) => {
  const values = _.reduce(
    filters,
    (values, filter) => {
      const { field, operator, value } = filter;
      let name = `${operator}:${field}`;
      if (value === 'NULL') {
        if (operator === 'isnull') {
          name = `eq:${field}`;
        }
        if (operator === 'isnotnull') {
          name = `!eq:${field}`;
        }
      }
      values[name] = value;
      return values;
    },
    {} as { [name: string]: any }
  );
  return values;
};

/**
 * FiltersFormContext
 * Used for communicating between the FiltersForm component and nested form elements.
 */
type FiltersFormContextProps = {
  getValue: (key: string) => any;
  setValue: (key: string, value: any) => void;
  setValues: (values: object) => void;
  values: object;
};
const FiltersFormContext = React.createContext<FiltersFormContextProps>(
  {} as FiltersFormContextProps
);
export const useFiltersFormContext = () => React.useContext(FiltersFormContext);

/**
 * FiltersForm component
 * Uses helpers to create a context map between SearchInputFilters and FilterInputs.
 */
export type FiltersFormProps = React.PropsWithChildren<{
  value: SearchInputFilter[] | undefined;
  onChange?: (values: SearchInputFilter[]) => any;
}>;
export function FiltersForm<Data extends UI.DataGridRow, FilterableFields>({
  children,
  value,
  onChange,
}: FiltersFormProps) {
  const formValues = React.useMemo(
    () => getFormValuesFromSearchInputFilters(value),
    [value]
  );

  const getValue = React.useCallback(
    (key: string): any => {
      return formValues[key];
    },
    [formValues, onChange]
  );

  const setValue = React.useCallback(
    (key: string, value: any) => {
      const newFormValues = _.clone(formValues);
      newFormValues[key] = value;
      const newFilters = getSearchInputFiltersFromFormValues(newFormValues);
      onChange?.(newFilters);
    },
    [formValues, onChange]
  );

  const setValues = React.useCallback(
    (newValues: object) => {
      const newFilters = getSearchInputFiltersFromFormValues({
        ...formValues,
        ...newValues,
      });
      onChange?.(newFilters);
    },
    [formValues, onChange]
  );

  return (
    <FiltersFormContext.Provider
      value={{ getValue, setValue, setValues, values: formValues }}
    >
      {children}
    </FiltersFormContext.Provider>
  );
}
