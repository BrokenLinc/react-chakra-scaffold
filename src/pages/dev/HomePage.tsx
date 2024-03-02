import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.home()} />
      <UI.Text mb={12} maxW="550px">
        Welcome to the front-end developer resources area! This area is public
        and contains <strong>no private or secure information</strong>. It{' '}
        <em>does</em> contain examples of how to use the UI library and other
        helpful tools.
      </UI.Text>

      <UI.Button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Clear Local Storage
      </UI.Button>
    </React.Fragment>
  );
};

export default HomePage;
