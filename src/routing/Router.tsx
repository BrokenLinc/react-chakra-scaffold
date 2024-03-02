import { ErrorPage } from '@@pages/ErrorPage';
import * as UI from '@@ui';
import _ from 'lodash';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { appAreas } from './appAreas';
import { getRoutesFromTree } from './helpers/getRoutesFromTree';
import { getRouteIdFromPaths } from './helpers/routeId';

/**
 * Map the appAreas to top-level routes, with their own layouts and sub-routes.
 */
const router = createBrowserRouter(
  _.map(appAreas, (appArea) => ({
    id: appArea.id,
    path: appArea.path,
    element: <appArea.layout />,
    errorElement: <ErrorPage />,
    children: getRoutesFromTree(appArea.routes).map((route) => {
      return {
        id: getRouteIdFromPaths({
          path: route.path,
          parentPath: route.parent?.path,
        }),
        path: route.path,
        element: <route.component />,
      };
    }),
  }))
);

export const Router: React.FC = () => {
  return (
    // This suspense wrapper handles loading the layout elements.
    <React.Suspense fallback={<UI.DelayedSpinner />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
};
