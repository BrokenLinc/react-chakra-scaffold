import { queryClient } from '../ApiProvider';

/**
 * This is a proposed way to handle query invalidation, where there is a
 * overlap in data sets between queries.
 *
 * The supplied parameter represents the entity that was changed.
 * The function invalidates all queries potentially affected by the change.
 *
 * If this works well, we can use this pattern for all entities,
 * and we could add more granular invalidation if needed.
 */

export enum BaseQueryKey {
  Users = 'users',
  UserProfiles = 'user-profiles',
}
export const invalidateQueries = (affectedKey: BaseQueryKey) => {
  queryClient.invalidateQueries(affectedKey);

  // Invalidate related queries
  switch (affectedKey) {
    case BaseQueryKey.Users:
      queryClient.invalidateQueries(BaseQueryKey.UserProfiles);
      break;
  }
};
