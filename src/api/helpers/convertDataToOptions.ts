import { DeepKeys } from '@@helpers/tsHelpers';
import _ from 'lodash';

/**
 * convertDataToOptions
 * Converts an array of objects to an array of objects with label and value properties
 * You can specify the mapping of the label and value properties, and whether or not to sort the resulting array
 *
 * @param data Any array of objects.
 * @param config Optional configuration object.
 * @param config.labelKey Either a property name for mapping, or a function that returns a string. Defaults to 'name'.
 * @param config.valueKey Either a property name for mapping, or a function that returns a value. Defaults to 'id'.
 * @param config.sort Either a property name for sorting, or true to sort by label. Defaults to false.
 * @returns An array of objects with label and value properties.
 */
export function convertDataToOptions<T extends object>(
  data: T[] | undefined,
  config?: {
    labelKey?: DeepKeys<T> | ((row: T) => any);
    valueKey?: DeepKeys<T> | ((row: T) => any);
    sort?: DeepKeys<T> | true;
  }
): { label: any; value: any }[] {
  if (!data?.length) return [];

  const { labelKey = 'name', valueKey = 'id', sort = false } = config || {};

  const getLabel = (row: T) => {
    if (typeof labelKey === 'function') return labelKey(row);
    return _.get(row, labelKey);
  };
  const getValue = (row: T) => {
    if (typeof valueKey === 'function') return valueKey(row);
    return _.get(row, valueKey);
  };

  const sortedData = typeof sort === 'string' ? _.sortBy(data, sort) : data;

  const options = sortedData.map((row) => ({
    label: getLabel(row),
    value: getValue(row),
  }));

  if (sort === true) {
    return _.sortBy(options, 'label');
  }

  return options;
}
