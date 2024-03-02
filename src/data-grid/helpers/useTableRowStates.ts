import React from 'react';

type UseTableRowStatesConfig = {
  defaultIsExpanded?: boolean;
};

/**
 * This hook works in conjunction with DataTables to track the expanded state of rows.
 */
export const useTableRowStates = (config: UseTableRowStatesConfig = {}) => {
  const { defaultIsExpanded = false } = config;
  const [expansions, setExpansions] = React.useState<{
    [key: string | number]: boolean;
  }>();

  const isExpanded = (id: string | number) => {
    if (expansions?.[id] !== undefined) {
      return expansions?.[id];
    }
    return defaultIsExpanded;
  };
  const expand = (id: string | number) => {
    setExpansions((prev) => ({ ...prev, [id]: true }));
  };
  const collapse = (id: string | number) => {
    setExpansions((prev) => ({ ...prev, [id]: false }));
  };
  const toggle = (id: string | number) => {
    setExpansions((prev) => ({ ...prev, [id]: !isExpanded(id) }));
  };
  const reset = () => {
    setExpansions(undefined);
  };

  React.useEffect(reset, [defaultIsExpanded]);

  return {
    isExpanded,
    expand,
    collapse,
    toggle,
    reset,
  };
};
