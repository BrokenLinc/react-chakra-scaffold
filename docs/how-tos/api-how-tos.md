# API How-tos

This page gives some guidance on how to set up API interactions and definitions that work with the applications forms and data-grids.

- [Add a new API collection](#add-a-new-api-collection)
- [Add a new schema & type](#add-a-new-schema--type)
- [Add a new query hook](#add-a-new-query-hook)
- [Add a new mutation hook](#add-a-new-mutation-hook)

## Add a new API collection

Add a new file into `./src/api`, naming it after the new entity type (eg. `usersApi.ts`).

## Add a new schema & type

In the API file, use Zod's methods (and the `zh` helpers) to create a schema and type to be used in form validation.

```ts
/* Example */
export const userInputSchema = z.object({
  firstName: zh.string().required(), // required
  middleName: zh.string.nullish(), // optional
  age: z.number().int(), // required
  kidneys: z.number().int().nullish(), // optional
  stateId: zh.int(), // required
  cityId: zh.int().nullish(), // optional
  childId: zh.uuid(), // required
  parentId: zh.uuid().nullish(), // optional
});
export type UserInput = z.infer<typeof userInputSchema>;
```

In the API file, use Zod's methods (and the `zh` helpers) to create a schema and type to be used for loading and displaying data.

```ts
/* Example */
export const userSchema = userInputSchema.extend({
  id: zh.uuid(), // backend-generated
  isDeleted: z.boolean(), // backend-generated
});
export type User = z.infer<typeof userSchema>;
```

## Add a new query hook

In the API file, use the entity type, `react-query` and `axios` to create a custom query hook, where the data is extracted and cached to a unique key.

```ts
/* Example */
export const useUser = (id: string) => {
  return useQuery<User, Error>([baseQueryKey, id], () => {
    return axios.get<User>(`${baseApiPath}/${id}`).then((res) => res.data);
  });
};
```

## Add a new mutation hook

In the API file, use the entity input type, `react-query` and `axios` to create a custom mutation hook, where any response data is extracted, and the relevant cache keys are invalidated upon success. For more advanced query invalidation across entity type, see [Query Invalidation](../query-invalidation.md).

```ts
/* Example */
export const useAddUser = () => {
  return useMutation<User, Error, UserInput>(
    (values) => {
      return axios.post<User>(baseApiPath, values).then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(baseQueryKey);
      },
    }
  );
};
```
