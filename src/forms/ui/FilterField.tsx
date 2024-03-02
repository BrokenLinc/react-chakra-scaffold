import { getFallbackFieldLabel } from '@@helpers/stringHelpers';
import * as UI from '@chakra-ui/react';
import React from 'react';

import { FilterInput, FilterInputProps } from './FilterInput';
import { FullFormControl, FullFormControlProps } from './FullFormControl';

/* Renders a form-control-display wrapper with dynamic form-input */
/* Must be placed inside a form-context-provider */
export type FilterFieldProps = Omit<FullFormControlProps, 'type'> &
  FilterInputProps;
export const FilterField: React.FC<FilterFieldProps> = ({
  label,
  name,
  type,
  input,
  children,
  ...restProps
}) => {
  const fallbackLabel = getFallbackFieldLabel(name);

  return (
    <FullFormControl
      {...restProps}
      name={name}
      label={label ?? fallbackLabel}
      errorDisplay="none"
    >
      <UI.HStack>
        {/* TODO: figure out why the types are causing a conflict here */}
        {/* @ts-ignore */}
        <FilterInput name={name} type={type} input={input} />
        {children}
      </UI.HStack>
    </FullFormControl>
  );
};
