import { AuthProtect } from '@@auth/AuthProtect';
import { useBasePath } from '@@routing/helpers/useBasePath';
import * as UI from '@@ui';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CommonLayoutProviders } from './ui/CommonLayoutProviders';

const AdminLayout = () => {
  const locationKey = useBasePath();

  return (
    <CommonLayoutProviders>
      <AuthProtect>
        <React.Suspense fallback={<UI.DelayedSpinner />}>
          <UI.ErrorBoundary key={locationKey}>
            <Outlet />
          </UI.ErrorBoundary>
        </React.Suspense>
      </AuthProtect>
    </CommonLayoutProviders>
  );
};
export default AdminLayout;
