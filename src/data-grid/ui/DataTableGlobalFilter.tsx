import { ComponentOverride } from '@@helpers/componentOverride';
import * as UI from '@@ui';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type DataTableGlobalFilterProps<Data extends UI.DataGridRow> = {
  dataGrid: UI.DataGridState<Data>;
  onChange: UI.DebouncedInputProps['onChange'];
  icon?: ComponentOverride<FontAwesomeIconProps>;
  input?: ComponentOverride<UI.DebouncedInputProps>;
} & Omit<UI.BoxProps, 'onChange'>;

/**
 * A display component for filtering a table built with ChakraUI.
 */
export function DataTableGlobalFilter<Data extends UI.DataGridRow>({
  dataGrid,
  onChange,
  icon,
  input,
  ...boxProps
}: DataTableGlobalFilterProps<Data>): JSX.Element {
  return (
    <UI.Box {...boxProps}>
      {input === false ? null : (
        <UI.DebouncedInput
          {...input}
          value={dataGrid.tempParams?.globalSearch || ''}
          onChange={onChange}
          leftIcon={
            icon === false
              ? undefined
              : {
                  icon: faSearch,
                  ...icon,
                }
          }
        />
      )}
    </UI.Box>
  );
}
