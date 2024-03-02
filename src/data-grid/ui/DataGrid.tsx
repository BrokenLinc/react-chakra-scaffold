import { SearchInput, SearchInputDeletedFilter } from '@@api/types';
import { ComponentOverride } from '@@helpers/componentOverride';
import { DeepKeys } from '@@helpers/tsHelpers';
import * as UI from '@@ui';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import React from 'react';
import { DataTable, DataTableProps } from './DataTable';
import {
  DataTableGlobalFilter,
  DataTableGlobalFilterProps,
} from './DataTableGlobalFilter';
import {
  DataTablePagination,
  DataTablePaginationProps,
} from './DataTablePagination';
import { FiltersForm } from './FiltersForm';

export type DataGridFilterFieldsProps = {
  searchElement: React.ReactNode;
  basicFilterFieldElements?: React.ReactNode;
  submissionElements: React.ReactNode;
};

export type DataGridComponentOverrideProps<Data extends UI.DataGridRow> = {
  globalFilter?: ComponentOverride<DataTableGlobalFilterProps<Data>>;
  deletedFilter?: ComponentOverride<UI.DeletedFilterSelectProps>;
  dataTable?: ComponentOverride<DataTableProps<Data>>;
  pagination?: ComponentOverride<DataTablePaginationProps<Data>>;
};

type DataGridProps<Data extends UI.DataGridRow> = {
  searchPlaceholder?: string;
  /**
   * filterFields are positioned in the built-in filter row,
   * between the globalFilter and the deletedFilter
   * */
  filterFields?: React.ReactNode;
  /**
   * renderFilterFields overrides the default display of all filters,
   * putting layout control in the implementation layer
   * */
  renderFilterFields?: React.FC<DataGridFilterFieldsProps>;
  /**
   * footerElements are positioned below the table on the right,
   *  shifting pagination to the left
   * */
  footerElements?: React.ReactNode;
  /**
   * canExpandAll is opt-in, and should only be used when
   * the expanded row won't tax the database if all rows are expanded.
   * */
  canExpandAll?: boolean;
  /**
   * filtersVisible hides the built-in filters row (even the reset button),
   * but can be useful for a limited data grid view.
   */
  filtersVisible?: boolean;
  dataGrid: UI.DataGridState<Data>;
  fetching?: boolean;
  loading?: boolean;
  hasParams?: boolean;
  onParamsChange?: (params: UI.DataGridParams<Data>) => void;
  onParamsReset?: () => void;
  onTempParamsChange?: (params: UI.DataGridParams<Data>) => void;
  onCommitTempParams?: () => void;
} & DataGridComponentOverrideProps<Data>;

/**
 * A flexible display component built with ChakraUI.
 * Supply your own table state, and override the components as needed.
 */
export function DataGrid<Data extends UI.DataGridRow>({
  dataGrid,
  fetching = false,
  loading = false,
  searchPlaceholder = 'Search',
  globalFilter,
  deletedFilter,
  filterFields,
  renderFilterFields = defaultRenderFilterFields,
  footerElements,
  canExpandAll = false,
  filtersVisible = true,
  dataTable,
  pagination,
  hasParams,
  onParamsChange,
  onTempParamsChange,
  onParamsReset,
  onCommitTempParams,
}: DataGridProps<Data>) {
  // Fade the UI and disable clicks when fetching data.
  const containerProps: UI.StackProps = fetching
    ? {
        pointerEvents: 'none',
        opacity: 0.5,
      }
    : {};
  const isDisabled = fetching || loading;

  /**
   * Update the search parameters based on each filter change.
   * Filters are applied to the "tempParams" and committed with "Apply".
   * Sorting, pagination, and expansion are applied to the "params" immediately.
   */
  const handleGlobalFilterChange = (globalSearch: string = '') => {
    // Overwrite with new filter value
    onTempParamsChange?.(
      _.merge({}, dataGrid.tempParams, {
        globalSearch,
      })
    );
  };

  const handleDeletedFilterChange = (
    deletedFilter?: SearchInputDeletedFilter
  ) => {
    // Remove old filter, add new one (which could be undefined)
    onTempParamsChange?.({
      ..._.omit(dataGrid.tempParams, 'deletedFilter'),
      deletedFilter,
    });
  };

  const handleDefaultExpandedChange = (defaultIsExpanded?: boolean) => {
    // Overwrite with new value
    onParamsChange?.({
      ...dataGrid.params,
      defaultIsExpanded,
    });
  };

  const handleColumnSortChange = (
    field: DeepKeys<Data>,
    direction?: UI.SortDirection
  ) => {
    // get (optional) sortableKeys for the field from  dataGrid.columns
    // (or else wrap the the field value in an array)
    const sortableKeys = dataGrid.columns.find((column) => column.key === field)
      ?.sortableKeys || [field];
    // then, map that array to sortingOptions if direction is activated
    const sortingOptions = direction
      ? sortableKeys.map((field) => ({ field, direction }))
      : [];

    onParamsChange?.({
      ...dataGrid.params,
      sortingOptions,
    });
  };

  const handlePageChange = (pageIndex: number) => {
    onParamsChange?.(
      _.merge({}, dataGrid.params, { pagination: { pageIndex } })
    );
  };

  const handleFiltersChange = React.useCallback(
    (filters: SearchInput<Data>['filters']) => {
      onTempParamsChange?.({
        ...dataGrid.tempParams,
        filters,
      });
    },
    [dataGrid.tempParams]
  );

  const paginationVisible =
    pagination !== false && (dataGrid.pageCount || 0) > 1;
  const resetButtonVisible =
    globalFilter !== false ||
    deletedFilter !== false ||
    !!filterFields ||
    !!renderFilterFields;

  const searchElement =
    globalFilter !== false ? (
      <DataTableGlobalFilter
        dataGrid={dataGrid}
        onChange={handleGlobalFilterChange}
        pb={0}
        w="full"
        {...globalFilter}
        input={{
          ...globalFilter?.input,
          isDisabled,
          placeholder: searchPlaceholder,
        }}
      />
    ) : null;

  const submissionElements = (
    <UI.HStack flex="0 0 auto" justifyContent="end">
      {deletedFilter !== false ? (
        <UI.DeletedFilterSelect
          value={dataGrid.tempParams?.deletedFilter}
          onChange={handleDeletedFilterChange}
          w="110px"
          ml="auto"
        />
      ) : null}
      {canExpandAll ? (
        <React.Fragment>
          {_.get(dataTable, 'renderExpandedRow') ? (
            <UI.BaseInput
              name="defaultIsExpanded"
              type="checkbox"
              value={dataGrid.params?.defaultIsExpanded}
              onChange={handleDefaultExpandedChange}
              input={{
                label: 'Expand All',
                styledAsInput: true,
              }}
            />
          ) : null}
        </React.Fragment>
      ) : null}
      <UI.Button onClick={onCommitTempParams}>Apply</UI.Button>
      {resetButtonVisible ? (
        <UI.DarkMode>
          <UI.IconButton
            variant="outline"
            onClick={onParamsReset}
            aria-label="Reset Filters & Paging"
            isDisabled={!hasParams}
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} />
          </UI.IconButton>
        </UI.DarkMode>
      ) : null}
    </UI.HStack>
  );

  return (
    <UI.VStack alignItems="stretch" spacing="0" {...containerProps}>
      {filtersVisible ? (
        <UI.Box
          bg="purple.100"
          py="7"
          px="7"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
        >
          <FiltersForm
            key={
              (dataGrid.tempParams?.filters || []).length > 0 ? 'some' : 'none'
            }
            value={dataGrid.tempParams?.filters}
            onChange={handleFiltersChange}
          >
            {renderFilterFields({
              searchElement,
              basicFilterFieldElements: filterFields,
              submissionElements,
            })}
          </FiltersForm>
        </UI.Box>
      ) : null}
      {!loading && dataGrid.rows?.length === 0 ? (
        <UI.WarningWell heading="No records found." m={7}>
          <UI.Box pt={4}>
            {hasParams ? (
              <UI.Button colorScheme="purple" onClick={onParamsReset} size="sm">
                Reset Filters & Paging
              </UI.Button>
            ) : null}
          </UI.Box>
        </UI.WarningWell>
      ) : (
        <React.Fragment>
          {dataTable !== false ? (
            <DataTable
              skeleton={loading}
              dataGrid={dataGrid}
              onColumnSortChange={handleColumnSortChange}
              defaultIsExpanded={dataGrid.params?.defaultIsExpanded}
              size="sm"
              variant="dataTable"
              {...dataTable}
            />
          ) : null}
          {paginationVisible || footerElements ? (
            <UI.HStack
              justifyContent={footerElements ? 'space-between' : 'center'}
              alignItems="start"
              py="5"
              px="7"
              borderTop="1px solid"
              borderTopColor="purple.100"
            >
              <UI.Box>
                {paginationVisible ? (
                  <DataTablePagination
                    onPageIndexChange={handlePageChange}
                    dataGrid={dataGrid}
                    {...pagination}
                  />
                ) : null}
              </UI.Box>
              {footerElements ? <UI.Box>{footerElements}</UI.Box> : null}
            </UI.HStack>
          ) : null}
        </React.Fragment>
      )}
    </UI.VStack>
  );
}

const defaultRenderFilterFields: React.FC<DataGridFilterFieldsProps> = ({
  searchElement,
  basicFilterFieldElements,
  submissionElements,
}) => {
  return (
    <UI.HStack alignItems="end">
      {searchElement}
      {basicFilterFieldElements}
      {submissionElements}
    </UI.HStack>
  );
};
