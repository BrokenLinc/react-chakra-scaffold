import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Basic info about a route
 */
export type AppRoute = {
  parent?: AppRoute;
  path: string;
  component: React.LazyExoticComponent<React.FC>;
  label: string;
  icon?: IconDefinition;
};

/**
 * Modal route shape
 */
export type ModalRoute = {
  parent: AppRoute;
  subPath: string;
  label: string;
  icon?: IconDefinition;
};

/**
 * A function that generates route info.
 * It can take in dynamic parameters for route segments.
 */
export type AppRouteFn = () => AppRoute;

/**
 * A nested object structure that represents the route tree.
 */
export type AppRouteTree = AppRouteFn | AppRoutes;
export type AppRoutes = {
  [key: string]: AppRouteTree;
};
