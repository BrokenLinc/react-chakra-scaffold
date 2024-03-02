import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useMatches } from 'react-router-dom';
import { routes } from './routes';
import { AppRoute, AppRoutes } from './types';

/*******************************
 * Top-level app areas
 *
 * These are the top-level sections of the app, such as admin, or root.
 * Here we define the layout, label and navigation menu routes for each app area.
 * The router will use these to generate the route structure, and the navigation
 * menu will use them to generate the menu items.
 *******************************/

export enum APP_AREA_ID {
  admin = 'admin',
  dev = 'dev',
  root = 'root',
}

/**
 * Use this type to ensure that the object keys match the ids and enum values.
 */
type AppAreas = {
  [K in APP_AREA_ID]: {
    id: K;
    label: string;
    path: string;
    layout: React.LazyExoticComponent<() => JSX.Element>;
    routes: AppRoutes;
    navigationMenuGroups?: Array<{
      label: string;
      routes: AppRoute[];
    }>;
    navigationMenuRoutes?: Array<AppRoute>;
    icon?: IconDefinition;
  };
};

/**
 * Defines the label and navigation menu routes for each app area.
 * Note: Routes should not be duplicated across app areas.
 */
export const appAreas: AppAreas = {
  root: {
    id: APP_AREA_ID.root,
    label: 'Root',
    path: '/',
    layout: React.lazy(() => import('../layouts/RootLayout')),
    routes: routes.root,
    navigationMenuRoutes: [routes.root.home()],
  },
  admin: {
    id: APP_AREA_ID.admin,
    label: 'Admin',
    path: '/admin',
    layout: React.lazy(() => import('../layouts/AdminLayout')),
    routes: routes.admin,
    navigationMenuRoutes: [routes.admin.home()],
  },
  dev: {
    id: APP_AREA_ID.dev,
    label: 'Developers',
    path: '/dev',
    layout: React.lazy(() => import('../layouts/DevLayout')),
    routes: routes.dev,
    navigationMenuRoutes: [
      routes.dev.home(),
      routes.dev.theme(),
      routes.dev.formInputs(),
      routes.dev.components(),
      routes.dev.minimalForm(),
      routes.dev.minimalDataGrid(),
      routes.dev.wumpusManager(),
    ],
  },
};

/**
 * Returns the current app area based on the current route.
 */
export const useAppArea = () => {
  const matches = useMatches();
  const appArea = appAreas[matches[0].id as APP_AREA_ID];
  return appArea;
};
