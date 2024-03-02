import { useIsRouteOrChildActive } from '@@routing/helpers/useIsRouteOrChildActive';
import { AppRoute } from '@@routing/types';
import * as UI from '@@ui';
import React from 'react';
import { Link } from 'react-router-dom';

export type RouteLinkProps = {
  route: AppRoute;
  activeProps?: UI.LinkProps;
  onActive?: () => void;
  activateOnChild?: boolean;
} & UI.LinkProps;
export const RouteLink = React.forwardRef<HTMLAnchorElement, RouteLinkProps>(
  ({ route, activeProps, onActive, activateOnChild, ...restProps }, ref) => {
    const isActive = useIsRouteOrChildActive(route, activateOnChild);
    React.useEffect(() => {
      if (isActive) {
        onActive?.();
      }
    }, [isActive]);

    return (
      <UI.Link
        ref={ref}
        as={Link}
        to={route.path}
        children={route.label}
        {...restProps}
        {...(isActive ? activeProps : {})}
      />
    );
  }
);
