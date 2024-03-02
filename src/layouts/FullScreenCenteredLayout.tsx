import { useBasePath } from '@@routing/helpers/useBasePath';
import * as UI from '@@ui';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CommonLayoutProviders } from './ui/CommonLayoutProviders';

export const FullScreenCenteredLayoutInner: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  return (
    <CommonLayoutProviders>
      <UI.Flex
        w="100%"
        h="auto"
        minH="100dvh"
        p="4"
        alignItems="center"
        justifyContent="center"
      >
        <UI.Card>
          <UI.CardBody>{children}</UI.CardBody>
        </UI.Card>
      </UI.Flex>
    </CommonLayoutProviders>
  );
};

const FullScreenCenteredLayout = () => {
  const locationKey = useBasePath();

  return (
    <FullScreenCenteredLayoutInner>
      <React.Suspense fallback={<UI.DelayedSpinner />}>
        <UI.ErrorBoundary key={locationKey}>
          <Outlet />
        </UI.ErrorBoundary>
      </React.Suspense>
    </FullScreenCenteredLayoutInner>
  );
};

export default FullScreenCenteredLayout;
