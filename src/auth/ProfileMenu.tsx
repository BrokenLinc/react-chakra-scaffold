import * as UI from '@@ui';
import React from 'react';
import { useAuth } from './AuthProvider';

export const CurrentUserAvatar: React.FC<UI.AvatarProps> = ({
  ...restProps
}) => {
  const auth = useAuth();

  return (
    <UI.Avatar name={auth.user?.email} bgColor="purple.100" {...restProps} />
  );
};

export const ProfileMenu: React.FC<UI.StackProps> = (props) => {
  const auth = useAuth();

  return auth.user ? (
    <UI.HStack {...props}>
      {/* Isolate the immediate popper container from margin + padding  */}
      <UI.Box key="popper-container">
        <UI.Menu closeOnSelect>
          <UI.MenuButton>
            <React.Suspense
              fallback={
                <UI.Flex
                  h={12}
                  w={12}
                  alignItems="center"
                  justifyContent="center"
                >
                  <UI.Spinner display="block" />
                </UI.Flex>
              }
            >
              <CurrentUserAvatar />
            </React.Suspense>
          </UI.MenuButton>
          <UI.MenuList fontSize="sm">
            <UI.MenuItem>
              <UI.Text fontWeight="bold">{auth.user?.email}</UI.Text>
            </UI.MenuItem>
            <UI.MenuItem onClick={auth.logout}>Log Out</UI.MenuItem>
          </UI.MenuList>
        </UI.Menu>
      </UI.Box>
    </UI.HStack>
  ) : null;
};
