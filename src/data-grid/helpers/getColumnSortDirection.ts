import { DeepKeys } from '@@helpers/tsHelpers';
import * as UI from '@@ui';
import _ from 'lodash';

/**
 * Returns the sort direction of a column by key, given a DataGridState with possible sorting options.
 *
 * The wrinkle here is that columns may have a `sortableKeys` property, which is an array of keys.
 * In this case, sorting should only be applied if all of those sortable keys are sorted in the same direction.
 */
export const getColumnSortDirection = <Data extends UI.DataGridRow>(
  dataGrid: UI.DataGridState<Data>,
  columnKey: DeepKeys<Data>
) => {
  if (!dataGrid.params?.sortingOptions) return;

  const column = _.find(dataGrid.columns, {
    key: columnKey,
  }) as UI.DataGridColumn<Data>;
  if (!column) return;

  const sortableKeys = column.sortableKeys || [column.key];
  const directions: UI.SortDirection[] = [];
  sortableKeys.forEach((field) => {
    const sort = _.find(dataGrid.params?.sortingOptions, {
      field,
    }) as UI.SortingOptions<Data>;
    directions.push(sort?.direction);
  });
  const uniqueDirections = _.uniq(directions);
  if (uniqueDirections.length === 1) {
    return uniqueDirections[0];
  }

  return undefined;
};
