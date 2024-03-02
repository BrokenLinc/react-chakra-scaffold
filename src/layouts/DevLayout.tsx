import { appAreas } from '@@routing/appAreas';
import { useBasePath } from '@@routing/helpers/useBasePath';
import * as UI from '@@ui';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CommonLayoutProviders } from './ui/CommonLayoutProviders';

const DevToolsLayout = () => {
  const locationKey = useBasePath();

  return (
    <CommonLayoutProviders>
      <UI.Box p={4} className="print-hidden">
        <UI.Menu>
          <UI.MenuButton as={UI.Button}>Dev menu</UI.MenuButton>
          <UI.MenuList>
            {appAreas.dev.navigationMenuRoutes?.map((route) => (
              <UI.MenuItem
                key={route.path}
                as={UI.RouteLink}
                route={route}
                activeProps={{
                  colorScheme: 'purple',
                }}
              >
                {route.label}
              </UI.MenuItem>
            ))}
          </UI.MenuList>
        </UI.Menu>
      </UI.Box>

      <UI.Box p={4} className="print-flush">
        <React.Suspense fallback={<UI.DelayedSpinner />}>
          <UI.ErrorBoundary key={locationKey}>
            <Outlet />
          </UI.ErrorBoundary>
        </React.Suspense>
      </UI.Box>
    </CommonLayoutProviders>
  );
};

export default DevToolsLayout;
