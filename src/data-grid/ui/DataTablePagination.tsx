import * as UI from '@@ui';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type DataTablePaginationProps<Data extends UI.DataGridRow> = {
  dataGrid: UI.DataGridState<Data>;
  onPageIndexChange?: (pageIndex: number) => void;
} & UI.BoxProps;

/**
 * A display component for paginating a table built with ChakraUI.
 */
export function DataTablePagination<Data extends UI.DataGridRow>({
  dataGrid,
  onPageIndexChange,
  ...boxProps
}: DataTablePaginationProps<Data>): JSX.Element {
  const pageCount = dataGrid.pageCount || 1;
  const pageIndex = dataGrid.params?.pagination?.pageIndex || 1;
  const canGoPrevious = pageIndex > 1;
  const canGoNext = pageIndex < pageCount;

  return (
    <UI.VStack {...boxProps}>
      <UI.ButtonGroup size="sm">
        <UI.Button
          onClick={() => onPageIndexChange?.(1)}
          isDisabled={!canGoPrevious}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </UI.Button>
        <UI.Button
          onClick={() => onPageIndexChange?.(pageIndex - 1)}
          isDisabled={!canGoPrevious}
        >
          Prev
        </UI.Button>
        <UI.Button
          onClick={() => onPageIndexChange?.(pageIndex + 1)}
          isDisabled={!canGoNext}
        >
          Next
        </UI.Button>
        <UI.Button
          onClick={() => onPageIndexChange?.(pageCount)}
          isDisabled={!canGoNext}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </UI.Button>
      </UI.ButtonGroup>
      <UI.Text fontSize="sm">
        Page {pageIndex} of {pageCount}
      </UI.Text>
    </UI.VStack>
  );
}
