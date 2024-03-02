import { useWumpuses, Wumpus } from '@@api/wumpusesApi';
import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import React from 'react';

const columns: UI.DataGridColumn<Wumpus>[] = [
  {
    key: 'firstName',
    header: 'First Name',
  },
  {
    key: 'percent',
    header: 'Percent',
    meta: {
      type: 'number',
    },
  },
  {
    key: 'email',
    header: 'Email',
    meta: {
      subtype: 'email',
    },
  },
  {
    key: 'phone',
    header: 'Phone',
    meta: {
      subtype: 'phone',
    },
  },
  {
    key: 'isActive',
    header: 'Active',
    meta: {
      type: 'boolean',
    },
  },
  {
    key: 'price',
    header: 'Price',
    meta: {
      type: 'number',
      subtype: 'currency',
    },
  },
];

export const WumpusDataGrid: React.FC = () => {
  const searchWumpuses = useWumpuses();

  return (
    <UI.DataGrid
      dataGrid={{
        rows: searchWumpuses.data,
        columns,
      }}
      globalFilter={false}
      deletedFilter={false}
      dataTable={{
        size: 'sm',
        getRowEditRoute: (data) => routes.dev.wumpusEdit(data.id),
        getRowMenuItems: (data) => [
          {
            children: 'Delete',
            onClick: () => window.alert(`Record #${data.id} deleted!`),
          },
        ],
      }}
    />
  );
};
