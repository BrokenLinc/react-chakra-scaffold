import { queryClient } from '@@api/ApiProvider';
import {
  createAuthRefreshInterceptor,
  LoginInput,
  useLogin,
  useLogout,
} from '@@api/authApi';
import { User } from '@@api/usersApi';
import { useConfirmation } from '@@dialogs/confirmation';
import React from 'react';
import useLocalStorageState from 'use-local-storage-state';

type AuthContextType = {
  user: User | null;
  login: (data: LoginInput) => any;
  logout: () => any;
};

/**
 * Context for tracking the user's authentication status and providing
 * methods for logging in and out.
 */
const AuthContext = React.createContext({} as AuthContextType);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const confirmation = useConfirmation();
  const [apiLoginState, apiLogin] = useLogin();
  const [apiLogoutState, apiLogout] = useLogout();

  const [user, setUser] = useLocalStorageState<User | null>(
    'demo/user/profile',
    {
      defaultValue: null,
    }
  );

  const login = (data: LoginInput) => {
    return apiLogin({ data }).then((response) => {
      setUser(response.data);
    });
  };

  const logout = () => {
    return apiLogout().then(() => {
      setUser(null);
      queryClient.clear();
    });
  };

  React.useEffect(() => {
    createAuthRefreshInterceptor(() => {
      // If the refresh token is expired, log the user out
      setUser((prevUser) => {
        if (prevUser) {
          confirmation.open({
            title: 'Logged out',
            message:
              "Your session has expired. To keep your account safe, we've logged you out. Please log back in.",

            confirmLabel: 'Ok',
          });
        }
        return null;
      });
      queryClient.clear();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
