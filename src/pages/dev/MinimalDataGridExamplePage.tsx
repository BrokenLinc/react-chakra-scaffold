import { useWumpuses, Wumpus } from '@@api/wumpusesApi';
import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import React from 'react';

/**
 * This page demonstrates the minimal data-grid setup.
 * There is no filtering, sorting or pagination.
 * */

const columns: UI.DataGridColumn<Wumpus>[] = [
  {
    key: 'id',
    header: 'ID',
  },
  {
    key: 'firstName',
    header: 'First Name',
  },
  {
    key: 'lastName',
    header: 'Last Name',
  },
];

export const MinimalDataGridExamplePage: React.FC = () => {
  const wumpuses = useWumpuses();
  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.minimalDataGrid()} />

      <UI.DataGrid
        dataGrid={{
          columns,
          rows: wumpuses.data,
        }}
        globalFilter={false}
        pagination={false}
      />
    </React.Fragment>
  );
};

export default MinimalDataGridExamplePage;
