import * as UI from '@@ui';
import _ from 'lodash';

/**
 * A display component for skeleton rows in a table using ChakraUI.
 */
export function DataTableSkeleton({
  rows,
  columns,
  firstCell,
  lastCell,
}: {
  rows: number;
  columns: number;
  firstCell?: JSX.Element;
  lastCell?: JSX.Element;
}): JSX.Element {
  return (
    <UI.Tbody>
      {_.times(rows, (i) => (
        <UI.Tr key={i}>
          {firstCell}
          {_.times(columns, (j) => {
            return (
              <UI.Td key={j}>
                <UI.Box
                  bg="gray.100"
                  borderRadius="md"
                  color="gray.100"
                  _after={{
                    content: '"—"',
                    display: 'block',
                  }}
                />
              </UI.Td>
            );
          })}
          {lastCell}
        </UI.Tr>
      ))}
    </UI.Tbody>
  );
}
