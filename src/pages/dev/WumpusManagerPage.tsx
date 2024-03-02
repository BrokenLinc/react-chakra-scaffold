import { WumpusDataGrid } from '@@components/WumpusDataGrid';
import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import React from 'react';

export const WumpusManagerPage: React.FC = () => {
  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.wumpusManager()}>
        <UI.RouteButton route={routes.dev.wumpusNew()} />
      </UI.RoutePageTitle>
      <UI.Card>
        <UI.CardBody px="0" pt="0" pb="0">
          <WumpusDataGrid />
        </UI.CardBody>
      </UI.Card>
    </React.Fragment>
  );
};

export default WumpusManagerPage;
