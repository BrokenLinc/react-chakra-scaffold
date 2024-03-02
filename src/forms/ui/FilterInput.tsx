import { useFiltersFormContext } from '@@data-grid/ui/FiltersForm';
import { getReferencedEntityLabel } from '@@forms/helpers/getReferencedEntityLabel';
import _ from 'lodash';
import React from 'react';
import { BaseInput, BaseInputByTypeProps } from './BaseInput';

/**
 * Connects the BaseInput to the react-hook-form controller
 */
export type FilterInputProps = BaseInputByTypeProps & {
  name: string;
};
export const FilterInput: React.FC<FilterInputProps> = (props) => {
  const { name, type } = props;

  const form = useFiltersFormContext();
  const value = form.getValue(name);

  let propsFromFormState = {};
  if (type === 'combobox' || type === 'combobox-paginated') {
    if (value) {
      propsFromFormState = {
        input: {
          defaultValue: value && {
            label: getReferencedEntityLabel(form.values, name),
            value,
          },
        },
      };
    }
  }

  return (
    <BaseInput
      {..._.merge(propsFromFormState, props)}
      value={value}
      onChange={(value, metaValues) => {
        form.setValues({
          [name]: value,
          ...metaValues,
        });
      }}
    />
  );
};
