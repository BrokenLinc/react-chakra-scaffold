import { FullScreenCenteredLayoutInner } from '@@layouts/FullScreenCenteredLayout';
import * as UI from '@@ui';
import React from 'react';

import { routes } from '@@routing/routes';
import { useAuth } from './AuthProvider';
import { LoginForm } from './LoginForm';

/**
 * A wrapper component that verifies the user is authenticated before rendering the children.
 */
export const AuthProtect: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth = useAuth();

  return auth.user ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <FullScreenCenteredLayoutInner>
      <UI.DocumentTitle>Log In</UI.DocumentTitle>
      <UI.RoutePageTitle
        color="purple.400"
        lineHeight="shorter"
        route={routes.home()}
        mb="8"
      />
      <LoginForm />
    </FullScreenCenteredLayoutInner>
  );
};
