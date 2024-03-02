import React from 'react';

/**
 * This file is used to lazy load all of the pages in the application.
 * It's centralized to avoid redefining the same page, causing a remount.
 */

export const ComingSoonPage = React.lazy(() => import('./ComingSoonPage'));
export const HomePage = React.lazy(() => import('./HomePage'));

export const admin = {
  HomePage: React.lazy(() => import('./admin/HomePage')),
};

export const dev = {
  ComponentExamplesPage: React.lazy(
    () => import('./dev/ComponentExamplesPage')
  ),
  ThemeExamplesPage: React.lazy(() => import('./dev/ThemeExamplesPage')),
  FormInputExamplesPage: React.lazy(
    () => import('./dev/FormInputExamplesPage')
  ),
  HomePage: React.lazy(() => import('./dev/HomePage')),
  MinimalDataGridExamplePage: React.lazy(
    () => import('./dev/MinimalDataGridExamplePage')
  ),
  MinimalFormExamplePage: React.lazy(
    () => import('./dev/MinimalFormExamplePage')
  ),
  WumpusEditPage: React.lazy(() => import('./dev/WumpusEditPage')),
  WumpusManagerPage: React.lazy(() => import('./dev/WumpusManagerPage')),
  WumpusNewPage: React.lazy(() => import('./dev/WumpusNewPage')),
};
