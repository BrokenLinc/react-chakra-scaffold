# Forms How-tos

This page gives some guidance on how to create new grid-based form layouts, and stateful, validated forms that can interact with the API.

# Add a form-grid

Often the form-grid can be used in both "add" and "edit" forms. It is simply a set of named inputs in a layout container.

The `FormField` component is extremely flexible. See the [examples](http://localhost:5173/dev/form-inputs) (client must be running).

```tsx
export const UserFormGrid: React.FC = () => {
  return (
    <UI.FormGrid>
      <UI.FormField name="firstName" requiredStyling />
      <UI.FormField name="middleName" span="sm" />
    </UI.FormGrid>
  );
};
```

# Add a form

Use `react-hook-form` and the [input schema and type](./api-how-tos.md#add-a-new-schema--type) to created a validated form that can be posted to a [custom mutation hook](./api-how-tos.md#add-a-new-mutation-hook).

Use the `QuickForm` component to automatically add a "submit" button and handle form-level errors.

```tsx
export const NewUserForm: React.FC = () => {
  const mutation = useAddUser();

  const form = useHookForm<UserInput>({
    resolver: zodResolver(userInputSchema),
    onValid: async (data) => {
      await mutation.mutateAsync(data);
    },
  });

  return (
    <UI.QuickForm form={form}>
      <UserFormGrid />
    </UI.QuickForm>
  );
};
```
