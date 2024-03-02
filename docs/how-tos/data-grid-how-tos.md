# Data-grid How-tos

Fully searchable, filterable data-grids with pagination and contextual options have quite a few moving parts, so it would be best to find one in the system and copy it. But, below is a bare-bones example.

## 1. Add a "Search" query hook

This connects to a "search" API endpoint, which takes in extra query information and returns the results along with metadata.

Note that is uses `SearchInput` and `SearchResult` with the desired type, and disables `suspense` so as to not flicker the UI during successive searches.

```ts
export const useUserSearch = (input: SearchInput<User>) => {
  return useQuery<SearchResult<User>, Error>(
    [baseQueryKey, 'search', input],
    () => {
      return axios
        .post<SearchResult<User>>(`${baseApiPath}/search`, input)
        .then((res) => res.data);
    },
    {
      suspense: false,
    }
  );
};
```

## 2. Add a DataGrid component

In this simplest example, define the table columns to display in the desired order, use the `useDataGridParams` hook with a unique key to maintain the data-grid's state, and connect that state to the query hook and the `DataGrid` component.

```tsx
const columns = [
  {
    key: 'firstName',
  },
  {
    key: 'middleName',
  },
];

export const UserDataGrid: React.FC = () => {
  const dataGridParams = UI.useDataGridParams<User>('user');
  const { data, isLoading, isFetching } = useUserSearch(
    dataGridParams.searchInput
  );
  return (
    <UI.DataGrid
      dataGrid={{
        columns,
        rows: data?.data,
        pageCount: data?.meta.pageCount,
        params: dataGridParams.value,
        tempParams: dataGridParams.tempValue,
      }}
      hasParams={dataGridParams.dirty}
      onParamsChange={dataGridParams.setValue}
      onParamsReset={dataGridParams.reset}
      onTempParamsChange={dataGridParams.setTempValue}
      onCommitTempParams={dataGridParams.commitTempValue}
      loading={isLoading}
      fetching={isFetching}
    />
  );
};
```

## 3. Decorate the columns

Assign an optional `type` to apply some basic styling and alignment.

```tsx
const columns = [
  {
    key: 'age',
    type: 'number',
  },
  {
    key: 'isSpecial',
    type: 'boolean',
  },
];
```

Assign an optional `meta` object to apply formatting to the value.

```tsx
const columns = [
  {
    key: 'SKU',
    meta: {
      format: (value) => `SKU #${SKU}`,
    },
  },
];
```

Assign a pre-built `subtypeMeta` to the `meta` property to apply standardized formatting to the value.

```tsx
const columns = [
  {
    key: 'phone',
    meta: { subtype: 'phone' },
  },
  {
    key: 'price',
    meta: { subtype: 'currency' },
  },
];
```

Assign an optional `cell` function to incorporate multiple values from the row. This will override `meta.format`. Note that even though you may display multiple values, you still need to pick a unique one to be the `key`.

```tsx
const columns = [
  {
    key: 'lastName',
    cell: (row) => {
      return `${row.lastName}, ${row.firstName}`;
    },
  },
];
```

Assign an optional `sortable` property of `true` to enable basic sorting on that column key. Assign an additional optional `sortableKeys` property with an array of column keys to filter on multiple fields when that column is tapped.

```tsx
const columns = [
  {
    key: 'firstName',
    sortable: true,
  },
  {
    key: 'startDate',
    sortable: true,
    sortableKeys: ['startDate', 'startTime'],
  },
];
```

## 4. Add functionality

See examples throughout the app for how to:

- Enhance the configuration of the columns and rows before passing them in to the `DataGrid`:
  - Tailor each table column by adding the `sortable`, `header` and `meta` properties.
  - Pre-sort and filter the data by padding an initial state to `useDataGridParams`.
- Modify the `DataGrid` by setting specific props:
  - Add custom filters using the `filterFields` and/or `renderFilterFields` property along with the `FilterField` component.
  - Hide the entire filter region by setting `filtersVisible` to `false`.
  - Disable features by setting `globalFilter`, `deletedFilter`, or `pagination` to `false`.
- Set the `dataTable` prop to modify the table used inside the grid.
  - Link an "Edit" button to a route on each row by using the `getRowEditRoute` property.
  - Add more custom buttons beside the built-in "Edit" button by using the `renderExtraButtons` property.
  - Add a context menu to the end of each row using the `getRowMenuItems` property.
  - Add an expand/collapse toggle to each row by using the `renderExpandedRow` property.
  - Add an extra row on the end of the table (with your own content) by using the `renderAppendedRow` property.
  - Add a stripe along the left side of the table to indicate related rows by using the `groupBy` property.
  - Style the container around the table with the `tableContainer` property.
