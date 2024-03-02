import * as UI from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

/* Must be placed inside a form-context-provider */
export const SubmitButton: React.FC<UI.ButtonProps> = ({
  children,
  ...restProps
}) => {
  const form = useFormContext();

  return (
    <UI.Button
      type="submit"
      preset="primary"
      isDisabled={form.formState.isSubmitting}
      {...restProps}
    >
      {children}
    </UI.Button>
  );
};
