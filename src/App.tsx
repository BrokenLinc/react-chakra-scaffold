import { ApiProvider } from '@@api/ApiProvider';
import { AuthProvider } from '@@auth/AuthProvider';
import { Router } from '@@routing/Router';
import { ThemeProvider } from '@@theme/ThemeProvider';
import React from 'react';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ApiProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ApiProvider>
    </ThemeProvider>
  );
};
