import * as UI from '@@ui';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AsyncProps, AsyncSelect, SelectInstance } from 'chakra-react-select';
import React from 'react';

/**
 * A wrapper for the AsyncSelect component that provides default props.
 */
export type ComboboxInputProps = AsyncProps<any, any, any>;
export const ComboboxInput = React.forwardRef<
  SelectInstance,
  ComboboxInputProps
>(({ chakraStyles, defaultValue, value, ...restProps }, ref) => {
  const [resetCount, setResetCount] = React.useState(0);
  const [focused, setFocused] = React.useState(false);

  // When the value changes to nil, clear the input
  React.useEffect(() => {
    if (!value) {
      setResetCount((c) => c + 1);
    }
  }, [value]);

  return (
    <AsyncSelect
      ref={ref}
      key={resetCount}
      chakraStyles={{
        ...chakraStyles,
        container: (p) => ({
          ...p,
          flex: 'auto',
          ...chakraStyles?.container,
        }),
        menu: (p) => ({
          ...p,
          zIndex: 3,
          ...chakraStyles?.menu,
        }),
        noOptionsMessage: (p) => ({
          ...p,
          color: undefined,
          fontWeight: '500',
          fontSize: 'lg',
          ...chakraStyles?.noOptionsMessage,
        }),
        singleValue: (p) => ({
          ...p,
          bg: focused ? 'blue.100' : 'transparent',
          ...chakraStyles?.singleValue,
        }),
      }}
      defaultOptions // Set to true only on a case-by-case basis, will search with blank string
      useBasicStyles
      cacheOptions // Caching turned on by default, supply a cacheKey to override
      isClearable
      backspaceRemovesValue
      openMenuOnFocus
      noOptionsMessage={({ inputValue }) =>
        inputValue ? (
          <UI.Text size="lg" fontSize="lg">
            No results found.
          </UI.Text>
        ) : (
          <UI.Text size="lg" fontSize="lg">
            <UI.Icon mr={2} icon={faSearch} />
            Type to search...
          </UI.Text>
        )
      }
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
      }}
      // Only display defaultValue if the current value matches
      defaultValue={value === defaultValue?.value ? defaultValue : undefined}
      {...restProps}
    />
  );
});
