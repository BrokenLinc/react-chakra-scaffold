import { getColumnSortDirection } from '@@data-grid/helpers/getColumnSortDirection';
import { useTableRowStates } from '@@data-grid/helpers/useTableRowStates';
import { DeepKeys } from '@@helpers/tsHelpers';
import { AppRoute } from '@@routing/types';
import * as UI from '@@ui';
import {
  faChevronDown,
  faChevronUp,
  faDiamond,
  faEllipsisV,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import React from 'react';
import { titleCase } from 'title-case';
import { SetRequired } from 'type-fest';
import { DataTableSkeleton } from './DataTableSkeleton';

export type DataTableRowMenuGetter<Data extends UI.DataGridRow> = (
  row: Data
) => UI.MenuItemProps[];

export type DataTableProps<Data extends UI.DataGridRow> = {
  skeleton?: boolean;
  dataGrid: UI.DataGridState<Data>;
  getRowEditRoute?: (row: Data) => AppRoute;
  renderExtraButtons?: React.FC<{ row: Data; index: number }>;
  getRowMenuItems?: DataTableRowMenuGetter<Data>;
  renderExpandedRow?: React.FC<{
    row: Data;
    index: number;
    td: SetRequired<UI.TableCellProps, 'colSpan'>;
  }>;
  renderAppendedRow?: React.FC<{
    td: SetRequired<UI.TableCellProps, 'colSpan'>;
  }>;
  defaultIsExpanded?: boolean;
  onColumnSortChange?: (
    field: DeepKeys<Data>,
    direction?: UI.SortDirection
  ) => any;
  groupBy?: keyof Data;
  getAddToGroupRoute?: (row: Data) => AppRoute;
  addToGroupLabel?: string;
  optionsHeader?: string;
  tableContainer?: UI.TableContainerProps;
} & UI.TableProps;

/**
 * A display component for built with ChakraUI.
 */
export function DataTable<Data extends UI.DataGridRow>({
  skeleton,
  dataGrid,
  getRowEditRoute,
  renderExtraButtons,
  getRowMenuItems,
  renderExpandedRow,
  renderAppendedRow,
  defaultIsExpanded,
  onColumnSortChange,
  groupBy,
  getAddToGroupRoute,
  addToGroupLabel,
  optionsHeader,
  tableContainer,
  ...tableProps
}: DataTableProps<Data>): JSX.Element {
  const rowStates = useTableRowStates({ defaultIsExpanded });
  const hasOptionsColumn =
    getRowEditRoute ||
    groupBy ||
    renderExtraButtons ||
    getAddToGroupRoute ||
    renderExpandedRow;
  const hasMenu = !!getRowMenuItems;
  const hasMenuColumn = hasMenu || _.some(dataGrid.rows, { isDeleted: true });

  // Initialize group properties, will be updated on each row render
  let groupIndex = -1;
  let groupByValue: any;

  // If the rows change, reset the expanded state
  React.useEffect(() => {
    rowStates.reset();
  }, [_.map(dataGrid.rows, 'id').join('|')]);

  let columnCount = dataGrid.columns.length;
  if (hasOptionsColumn) columnCount++;
  if (hasMenuColumn) columnCount++;

  return (
    <UI.TableContainer
      // Scroll horizontally when needed
      overflowX="auto"
      // Hide vertical scrollbar that is often triggered by horizontal scrolling
      overflowY="hidden"
      borderBottomLeftRadius="20px"
      borderBottomRightRadius="20px"
      minH="160px"
      style={{
        position: 'relative',
      }}
      {...tableContainer}
    >
      <UI.Table variant="dataTable" {...tableProps}>
        <UI.Thead>
          <UI.Tr
            sx={{
              pageBreakInside: 'avoid',
            }}
          >
            {hasOptionsColumn ? (
              <UI.Th w={0} bg="gray.600">
                {/* A button in style only */}
                <UI.Button
                  variant="ghost"
                  size="sm"
                  pointerEvents="none"
                  mx={-2}
                >
                  {optionsHeader}
                </UI.Button>
              </UI.Th>
            ) : null}
            {dataGrid.columns.map((column, i) => {
              const meta: any = column.meta;
              const fallbackHeader = titleCase(
                _.lowerCase(column.key.split('.').pop())
              );

              const sortDirection = getColumnSortDirection(
                dataGrid,
                column.key
              );
              const sortIcon = sortDirection ? (
                sortDirection === 'DESC' ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronUp} />
                )
              ) : column.sortable ? (
                <UI.Text color="white" fontSize="xs">
                  <FontAwesomeIcon icon={faDiamond} />
                </UI.Text>
              ) : null;
              const nextSortDirection: UI.SortDirection | undefined =
                sortDirection === 'ASC' ? 'DESC' : 'ASC';

              const alignment = meta?.type === 'number' ? 'right' : 'left';
              const flexAlignment = meta?.type === 'number' ? 'end' : 'start';

              const buttonElements = [
                <UI.Text key="label">
                  {column.header || fallbackHeader}
                </UI.Text>,
                <UI.Box key="icon" display="inline-block" w={3}>
                  {sortIcon}
                </UI.Box>,
              ];
              return (
                <UI.Th
                  key={`${column.key}_${i}`}
                  isNumeric={meta?.type === 'number'}
                  px={3}
                  bg="gray.600"
                >
                  <UI.VStack alignItems={flexAlignment} spacing={1}>
                    <UI.Button
                      variant="ghost"
                      colorScheme="gray"
                      color="white"
                      size="sm"
                      onClick={() =>
                        onColumnSortChange?.(column.key, nextSortDirection)
                      }
                      mx={-2}
                      as={column.sortable ? undefined : 'div'}
                      pointerEvents={column.sortable ? undefined : 'none'}
                      _hover={{ bg: 'purple.300' }}
                    >
                      <UI.HStack>
                        {alignment === 'right'
                          ? buttonElements.reverse()
                          : buttonElements}
                      </UI.HStack>
                    </UI.Button>
                  </UI.VStack>
                </UI.Th>
              );
            })}
            {hasMenuColumn ? <UI.Th bg="gray.600" /> : null}
          </UI.Tr>
        </UI.Thead>
        {skeleton ? (
          <DataTableSkeleton
            rows={dataGrid.params?.pagination?.pageSize || 10}
            columns={dataGrid.columns.length}
            firstCell={
              hasOptionsColumn ? (
                <UI.Td>
                  <UI.HStack spacing={1}>
                    {getRowEditRoute ? (
                      <UI.Button isDisabled size="sm">
                        Edit
                      </UI.Button>
                    ) : null}
                    {renderExtraButtons?.({ row: {} as Data, index: 0 })}
                  </UI.HStack>
                </UI.Td>
              ) : undefined
            }
            lastCell={
              hasMenuColumn ? (
                <UI.Td textAlign="right">
                  {hasMenu ? (
                    <UI.Button isDisabled size="xs" variant="ghost">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </UI.Button>
                  ) : null}
                </UI.Td>
              ) : undefined
            }
          />
        ) : (
          <UI.Tbody>
            {dataGrid.rows?.map((row, i) => {
              // Calculate grouping booleans
              const isFirstRow = i === 0;
              const isLastRow = i === (dataGrid.rows?.length || 0) - 1;
              const isFirstInGroup = groupBy
                ? groupByValue !== row[groupBy]
                : false;
              const isLastInGroup = groupBy
                ? isLastRow ||
                  row[groupBy] !== dataGrid.rows?.[i + 1]?.[groupBy]
                : false;

              // Update group properties
              if (isFirstInGroup) groupIndex++;
              groupByValue = groupBy ? row[groupBy] : undefined;
              const groupColor = groupIndex % 2 === 0 ? 'blue' : 'teal';

              const isExpandable = !!renderExpandedRow;
              const identifier = getIdentifier(row);
              const isExpanded = rowStates.isExpanded(identifier);

              return (
                <React.Fragment key={identifier}>
                  <UI.Tr
                    position="relative"
                    borderTopWidth={groupBy && isFirstRow ? '2px' : undefined}
                    borderBottomWidth={isLastInGroup ? '2px' : undefined}
                    sx={{
                      pageBreakInside: 'avoid',
                      '> td': {
                        borderColor: isExpanded ? 'transparent' : undefined,
                      },
                    }}
                  >
                    {hasOptionsColumn ? (
                      <UI.Td verticalAlign="top">
                        {groupBy ? (
                          <UI.Box
                            position="absolute"
                            top={0}
                            left={0}
                            bottom={0}
                            w={getAddToGroupRoute ? '48px' : 2}
                            bg={`${groupColor}.200`}
                          />
                        ) : null}
                        <UI.HStack spacing={1}>
                          {isExpandable ? (
                            <UI.Tooltip
                              label={isExpanded ? 'Collapse Row' : 'Expand Row'}
                              placement="top"
                              hasArrow
                            >
                              <UI.IconButton
                                aria-label={
                                  isExpanded ? 'Collapse Row' : 'Expand Row'
                                }
                                icon={
                                  <UI.Icon
                                    flip={isExpanded ? 'vertical' : undefined}
                                    icon={faChevronDown}
                                  />
                                }
                                onClick={() => rowStates.toggle(identifier)}
                                size="sm"
                              />
                            </UI.Tooltip>
                          ) : null}
                          {getAddToGroupRoute && groupBy ? (
                            <UI.Box w={10}>
                              {isFirstInGroup ? (
                                <UI.RouteButton
                                  colorScheme={groupColor}
                                  mx={-1}
                                  size="xs"
                                  mr={6}
                                  px={0}
                                  route={getAddToGroupRoute(row)}
                                >
                                  <UI.Tooltip
                                    label={addToGroupLabel || 'Add New'}
                                    hasArrow
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </UI.Tooltip>
                                </UI.RouteButton>
                              ) : null}
                            </UI.Box>
                          ) : null}
                          {getRowEditRoute ? (
                            <UI.RouteButton
                              size="sm"
                              route={getRowEditRoute(row)}
                              isDisabled={row.isDeleted}
                            >
                              Edit
                            </UI.RouteButton>
                          ) : null}
                          {renderExtraButtons?.({ row, index: i })}
                        </UI.HStack>
                      </UI.Td>
                    ) : null}
                    {dataGrid.columns.map((column, i) => {
                      const value = _.get(row, column.key);

                      return (
                        <UI.Td
                          key={`${column.key}_${i}`}
                          isNumeric={column.meta?.type === 'number'}
                          textAlign={
                            column.meta?.type === 'number' ? 'right' : 'left'
                          }
                          whiteSpace="normal"
                          verticalAlign="top"
                          py={3}
                        >
                          {column.cell ? (
                            column.cell(row) || <UI.ValueDisplay />
                          ) : (
                            <UI.ValueDisplay value={value} meta={column.meta} />
                          )}
                        </UI.Td>
                      );
                    })}
                    {hasMenuColumn ? (
                      <UI.Td textAlign="right" verticalAlign="top" py={3}>
                        <UI.HStack justifyContent="end">
                          {row.isDeleted ? (
                            <UI.Badge
                              size="lg"
                              colorScheme="orange"
                              variant="subtle"
                              px={2}
                              py={1}
                            >
                              Deleted
                            </UI.Badge>
                          ) : null}
                          {hasMenu ? (
                            <UI.Box key="popper-wrapper">
                              {/* Poppers don't like being nested directly in a Stack */}
                              <UI.Menu>
                                <UI.MenuButton
                                  as={UI.Button}
                                  size="xs"
                                  variant="ghost"
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </UI.MenuButton>
                                <UI.MenuList minW={0}>
                                  {getRowMenuItems
                                    ? getRowMenuItems(row).map((props, i) => (
                                        <UI.MenuItem key={i} {...props} />
                                      ))
                                    : null}
                                </UI.MenuList>
                              </UI.Menu>
                            </UI.Box>
                          ) : null}
                        </UI.HStack>
                      </UI.Td>
                    ) : null}
                  </UI.Tr>
                  {renderExpandedRow && isExpanded
                    ? renderExpandedRow({
                        row,
                        index: i,
                        td: {
                          colSpan: columnCount,
                          pt: 0,
                          whiteSpace: 'normal',
                        },
                      })
                    : null}
                </React.Fragment>
              );
            })}
            {renderAppendedRow?.({
              td: {
                colSpan: columnCount,
                pt: 0,
                whiteSpace: 'normal',
              },
            })}
          </UI.Tbody>
        )}
      </UI.Table>
    </UI.TableContainer>
  );
}

const getIdentifier = (row: UI.DataGridRow): string | number => {
  const value = _.get(row, '_seq') || _.get(row, 'id');
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  return '';
};
