import { Wumpus, wumpusSchema } from '@@api/wumpusesApi';
import { WumpusFormGrid } from '@@components/WumpusFormGrid';
import { useHookForm } from '@@forms/hooks/useHookForm';
import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';

export const WumpusNewPage: React.FC = () => {
  const form = useHookForm<Wumpus>({
    resolver: zodResolver(wumpusSchema),
    defaultValues: {
      // example of default value for autocomplete
      // state: { value: 'FL', label: 'Florida' },
    },
    onValid: (data) => {
      console.log('onValid', data);
      // This function can be async, and can throw errors to users.
    },
  });

  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.wumpusNew()} />
      <UI.QuickForm form={form}>
        <WumpusFormGrid />
      </UI.QuickForm>
    </React.Fragment>
  );
};

export default WumpusNewPage;
