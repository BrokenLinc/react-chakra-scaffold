import { ModalRoute } from '@@routing/types';
import { joinRoutePaths } from './joinRoutePaths';

/**
 * A function that generates proper modal-route info,
 * based upon the parent route.
 */
export const createModalRoute = (route: ModalRoute) => {
  return {
    ...route.parent,
    ...route,
    path: joinRoutePaths(route.parent.path, '/modal' + route.subPath),
  };
};
