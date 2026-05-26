import { QueryClient } from '@tanstack/vue-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      //!!Important note, this is not best practice in Production, since calling to many apis at once
      //TODO: not refetch data after add new user
      refetchInterval: 1000 * 60 * 5,
      retry: 2,
    },
  },
});


// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
    import('@tanstack/vue-query').QueryClient
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient
