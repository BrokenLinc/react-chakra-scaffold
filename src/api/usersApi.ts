import axios from 'axios';
import debounce from 'debounce-promise';
import { useMutation, useQuery } from 'react-query';
import { z } from 'zod';
import { convertDataToOptions } from './helpers/convertDataToOptions';
import { zh } from './helpers/zodHelpers';

import { BaseQueryKey, invalidateQueries } from './helpers/invalidateQueries';
import { FindInput, SearchInput, SearchResult } from './types';

const baseApiPath = '/users';
const baseQueryKey = BaseQueryKey.Users;

/**
 * Users
 */
export const userBaseSchema = z.object({
  email: zh.email().required(),
  isSoftLocked: z.boolean().nullish(),
  isAdminLocked: z.boolean().nullish(),
});
export const userInputSchema = userBaseSchema;
export type UserInput = z.infer<typeof userInputSchema>;

/**
 * Note: profilePicture in the User DTO but will be deprecated
 */
export const userSchema = userBaseSchema.extend({
  id: zh.uuid(),
  isDeleted: z.boolean(),
});
export type User = z.infer<typeof userSchema>;

type UserFindInput = FindInput & {
  includeRoles?: boolean;
  includeTypeaheads?: boolean;
};

export const useUser = (id: string, params: UserFindInput) => {
  return useQuery<User, Error>([baseQueryKey, id, params], () => {
    return axios
      .get<User>(`${baseApiPath}/${id}`, { params })
      .then((res) => res.data);
  });
};

export const useAddUser = () => {
  return useMutation<User, Error, UserInput>(
    (values) => {
      return axios.post<User>(baseApiPath, values).then((res) => res.data);
    },
    {
      onSuccess: () => {
        invalidateQueries(baseQueryKey);
      },
    }
  );
};

export const useDeleteUser = () => {
  return useMutation<boolean, Error, number | string>(
    (id) => {
      return axios
        .delete<boolean>(`${baseApiPath}/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        invalidateQueries(baseQueryKey);
      },
    }
  );
};

export const useRestoreUser = () => {
  return useMutation<User, Error, string | number>(
    (id) => {
      return axios
        .patch<User>(`${baseApiPath}/${id}/restore`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        invalidateQueries(baseQueryKey);
      },
    }
  );
};

export const useUpdateUser = (id: number | string) => {
  return useMutation<User, Error, UserInput>(
    (values) => {
      return axios
        .patch<User>(`${baseApiPath}/${id}`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        invalidateQueries(baseQueryKey);
      },
    }
  );
};

const convertUsersToOptions = (data?: User[]) => {
  return convertDataToOptions(data, {
    labelKey: (row) => {
      return row.email;
    },
  });
};

const userSearch = (input: SearchInput<User>) => {
  return axios
    .post<SearchResult<User>>(`${baseApiPath}/search`, input)
    .then((res) => res.data);
};

export const loadUserOptions = debounce(async (input: SearchInput<User>) => {
  const result = await userSearch(input);
  return convertUsersToOptions(result.data);
}, 250);

export const useUserSearch = (input: SearchInput<User>) => {
  return useQuery<SearchResult<User>, Error>(
    [baseQueryKey, 'search', input],
    () => userSearch(input),
    {
      suspense: false,
    }
  );
};
