import { useBasePath } from '@@routing/helpers/useBasePath';
import * as UI from '@@ui';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CommonLayoutProviders } from './ui/CommonLayoutProviders';

const RootLayout = () => {
  const locationKey = useBasePath();

  return (
    <CommonLayoutProviders>
      <React.Suspense fallback={<UI.DelayedSpinner />}>
        <UI.ErrorBoundary key={locationKey}>
          <Outlet />
        </UI.ErrorBoundary>
      </React.Suspense>
    </CommonLayoutProviders>
  );
};
export default RootLayout;
