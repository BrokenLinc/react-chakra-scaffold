import { LoginInput } from '@@api/authApi';
import { useAuth } from '@@auth/AuthProvider';
import { useHookForm } from '@@forms/hooks/useHookForm';
import * as UI from '@@ui';
import React from 'react';

export const LoginForm: React.FC = () => {
  const auth = useAuth();
  const form = useHookForm<LoginInput>({
    onValid: auth.login,
  });

  return (
    <UI.Form form={form} flex="1" display="flex" flexDir="column">
      <UI.FormGrid spacingY="0">
        <UI.FormField name="email" />
        <UI.FormField name="password" type="password" />
      </UI.FormGrid>
      <UI.AlertMessage>
        {form.formState.error
          ? 'Incorrect username or password. Try resetting your password or contacting support.'
          : null}
      </UI.AlertMessage>
      <UI.Box mt="auto">
        <UI.SubmitButton mt="6" w="full" size="lg">
          Log In
        </UI.SubmitButton>
      </UI.Box>
    </UI.Form>
  );
};
