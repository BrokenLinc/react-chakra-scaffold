import { toBase64Url } from '@@helpers/base64Helpers';
import * as Pages from '@@pages';
import {
  faBus,
  faCircleDollarToSlot,
  faClipboardList,
  faDoorOpen,
  faGraduationCap,
  faGrip,
  faHand,
  faPersonWalkingArrowRight,
  faPlaneUp,
} from '@fortawesome/free-solid-svg-icons';
import { createModalRoute } from './helpers/createModalRoute';

/**************************************************************
 * Centralized route definitions
 *
 * All the application routes should be defined here,
 * and then imported for usage in the router, links, menus, etc.
 **************************************************************/

/**
 * Root routes should have no paths prefix,
 * and should load pages from the /pages directory.
 */
export const rootRoutes = {
  home: () => ({
    path: '/',
    component: Pages.HomePage,
    label: 'Log In',
  }),
};

/**
 * Admin routes should have paths prefixed with /admin,
 * and should load pages from the /pages/admin directory.
 */
export const adminRoutes = {
  home: () => ({
    path: '/admin',
    component: Pages.admin.HomePage,
    label: 'Admin Home',
  }),
};

/**
 * Dev routes should have paths prefixed with /dev,
 * and should load pages from the /pages/dev directory.
 */
export const devRoutes = {
  home: () => ({
    path: '/dev',
    component: Pages.dev.HomePage,
    label: 'Overview',
  }),
  components: () => ({
    path: '/dev/components',
    component: Pages.dev.ComponentExamplesPage,
    label: 'Components',
  }),
  theme: () => ({
    path: '/dev/theme',
    component: Pages.dev.ThemeExamplesPage,
    label: 'Theme',
  }),
  minimalDataGrid: () => ({
    path: '/dev/minimal-data-grid',
    component: Pages.dev.MinimalDataGridExamplePage,
    label: 'Minimal Data-grid',
  }),
  minimalForm: () => ({
    path: '/dev/minimal-form',
    component: Pages.dev.MinimalFormExamplePage,
    label: 'Minimal Form',
  }),
  formInputs: () => ({
    path: '/dev/form-inputs',
    component: Pages.dev.FormInputExamplesPage,
    label: 'Form Inputs',
  }),
  wumpusManager: () => ({
    path: '/dev/wumpus',
    component: Pages.dev.WumpusManagerPage,
    label: 'Wumpus Manager',
  }),
  wumpusEdit: (id: number | string = ':id') => ({
    path: `/dev/wumpus/${id}`,
    component: Pages.dev.WumpusEditPage,
    label: 'Edit Wumpus',
  }),
  wumpusNew: () => ({
    path: '/dev/wumpus/new',
    component: Pages.dev.WumpusNewPage,
    label: 'New Wumpus',
  }),
};

export const routes = {
  ...rootRoutes,
  admin: adminRoutes,
  dev: devRoutes,
  root: rootRoutes,
};
