# Query Invalidation

This app uses react-query to manage queries and mutations, and to maintain a client-side data cache. Having a cache can cut down on the number of requests to the server, but managing the cache can be a pain. There is a method to invalidate specific sections of the cache, which automatically triggers a re-fetch if that data is accessed in the future.

Therefore, it's wise to invalidate relevant portions of the cache when the user alters data themselves, regardless of whatever caching strategies you might be using. In most cases, a simple invalidation call on the entity type when mutating data is sufficient.

**For example:**

```ts
// src/api/productsApi.ts
...
import { queryClient } from './ApiProvider';

const baseApiPath = '/products';
const baseQueryKey = 'products';

...

export const useDeleteProduct = () => {
  return useMutation<boolean, Error, string | number>(
    (id) => {
      return axios
        .delete<boolean>(`${baseApiPath}/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        // This will invalidate ALL caches that begin with [baseQueryKey, ...]
        queryClient.invalidateQueries(baseQueryKey);
      },
    }
  );
};
```

## Dependent Entity Caches

But what about entity types that are referenced by other entities? (For example, invalidating the `User` cache when a `UserProfile` is updated?) While there isn't a way to clear **dependent** caches automatically, our logic can at least be centralized. For this, there is a helper file: `src/api/helpers/invalidateQueries.ts`.

When you identify API endpoints that have an interdependent cache, follow these steps:

1. Centralize their query keys in this helper file.
2. Add the invalidation logic to the switch statement.
3. In the mutation calls that should trigger this dependent logic, replace `queryClient.invalidateQueries` with this `invalidateQueries` helper.

> Note: These changes _could_ be done across the entire app. The only reason it hasn't been done yet is because this solution was introduced as an experiment, and I'm still not sure it's the best one.
