import { SearchInput } from '@@api/types';
import { useBase64SearchParams } from '@@helpers/base64Helpers';
import { META_FIELD_SEPARATOR } from '@@helpers/getMetaFieldName';
import { sanitizeSearchParams } from '@@helpers/sanitizeSearchParams';
import { useBasePath } from '@@routing/helpers/useBasePath';
import * as UI from '@@ui';
import _ from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSessionStorage } from 'react-use';

/**
 * A hook for tracking data-grid parameters in the querystring and in session storage.
 * Search, filters and pagination will be stored uniquely by the base URL AND dataGridKey.
 */

export const useDataGridParams = <T extends UI.DataGridRow>(
  dataGridKey: string,
  initialParams?: UI.DataGridParams<T>,
  options?: {
    disablePersistence?: boolean;
  }
) => {
  const locationKey = useBasePath();
  const locationPathName = useLocation().pathname;

  // Store the params in local storage so that they persist across page refreshes
  const [storedParams, setStoredParams] = useSessionStorage(
    'routeDataGridParams',
    {}
  );

  const sanitizedParams = sanitizeSearchParams(initialParams);

  // Collect the initial params from local storage, or fallback to the default/init params
  const initParams = options?.disablePersistence
    ? sanitizedParams
    : (_.get(
        storedParams,
        [locationKey, dataGridKey],
        sanitizedParams
      ) as UI.DataGridParams<T>);

  // Use the initial params to set the state,
  //  either encoded in URL (default) or in local state
  const [_params, setParams, queryParam] = options?.disablePersistence
    ? React.useState<UI.DataGridParams<T>>(initParams)
    : useBase64SearchParams<UI.DataGridParams<T>>(
        `dgp-${dataGridKey}`,
        initParams
      );
  // Fallback params to the initial params if the params are empty
  const params = _.isEmpty(_params) ? initParams : _params;

  // Update the state-manager and local storage with the new params
  const setValue = (params: UI.DataGridParams<T>) => {
    setParams(params);

    if (options?.disablePersistence) return;

    // Clear out the previous params and assign new ones
    setStoredParams({
      ..._.omit(storedParams, [locationKey]),
      [locationKey]: {
        ..._.omit(_.get(storedParams, locationKey), [dataGridKey]),
        [dataGridKey]: params,
      },
    });
  };

  // Track temporary changes to the params
  // Includes uncommitted filters, global-search and deleted-filter
  const [tempParams, setTempParams] =
    React.useState<UI.DataGridParams<T>>(initParams);

  // Push the temporary params to the main params
  // Keeping the existing sorting options and resetting the page index
  const commitTempParams = () => {
    setValue(
      _.merge({}, tempParams, {
        sortingOptions: params.sortingOptions,
        pagination: {
          ...params.pagination,
          pageIndex: 1,
        },
      })
    );
  };

  // Set the initial params on mount, to ensure the URL is updated
  React.useEffect(() => {
    setValue(params);
  }, []);

  /**
   * If this hook is still mounted when the pathname changes,
   * this indicates sub-routing change, like a route modal.
   * Reset the params.
   */
  React.useEffect(() => {
    setValue(params);
  }, [locationPathName]);

  // Create helpers
  const reset = () => {
    setValue(sanitizedParams);
    setTempParams(sanitizedParams);
  };
  const dirty = !_.isEqual(params, sanitizedParams);

  // Remove meta fields (e.g. $comboboxLabel)
  const searchInputFilters = _.filter(params.filters, (filter) => {
    return !filter.field.includes(META_FIELD_SEPARATOR);
  });

  // Prepare params for the API
  const searchInput: SearchInput<T> = {
    globalSearch: params.globalSearch,
    deletedFilter: params.deletedFilter,
    page: params.pagination?.pageIndex,
    take: params.pagination?.pageSize,
    sortingOptions: params.sortingOptions || [],
    filters: searchInputFilters,
  };
  return {
    key: dataGridKey,
    value: params,
    setValue,
    tempValue: tempParams,
    setTempValue: setTempParams,
    commitTempValue: commitTempParams,
    searchInput,
    queryParam,
    reset,
    dirty,
  };
};
