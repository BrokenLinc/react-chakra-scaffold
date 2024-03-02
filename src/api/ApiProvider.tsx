import { convertDateStringsToDates } from '@@helpers/convertDateStringsToDates';
import axios from 'axios';
import { configure } from 'axios-hooks';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// Configuration for axios-hooks and direct axios calls
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.response.use((response) => {
  if (response.data) {
    response.data = convertDateStringsToDates(response.data);
  }
  return response;
});

// Configuration for axios-hooks
configure({
  defaultOptions: { manual: true },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: (failureCount, error: any) => {
        if (error.response.status < 500) return false;
        else if (failureCount < 2) return true;
        else return false;
      },
    },
  },
});

// Lookups are system-wide and rarely change, so we cache them forever
export const LOOKUP_CACHE_TIME = Infinity;

export const ApiProvider: React.FC<React.PropsWithChildren> = (props) => {
  return <QueryClientProvider client={queryClient} {...props} />;
};
