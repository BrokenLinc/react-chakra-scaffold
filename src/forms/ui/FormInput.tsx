import { getReferencedEntityLabel } from '@@forms/helpers/getReferencedEntityLabel';
import _ from 'lodash';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { BaseInput, BaseInputByTypeProps } from './BaseInput';

/**
 * Connects the BaseInput to the react-hook-form controller
 */
export type FormInputProps = BaseInputByTypeProps & {
  name: string;
  onChange?: (value: any) => any; // To be used only for side-effects
  highlightWhenDirty?: boolean;
  disableInputRef?: boolean;
};
export const FormInput: React.FC<FormInputProps> = (props) => {
  const { name, type, highlightWhenDirty } = props;

  const form = useFormContext();
  const controller = useController({ name, control: form.control });

  let propsFromFormState = highlightWhenDirty
    ? {
        input: {
          bg: controller.fieldState.isDirty ? 'orange.100' : undefined,
        },
      }
    : {};
  if (type === 'combobox' || type === 'combobox-paginated') {
    if (controller.field.value) {
      propsFromFormState = _.merge({}, propsFromFormState, {
        input: {
          defaultValue: controller.field.value && {
            label: getReferencedEntityLabel(form.getValues(), name),
            value: controller.field.value,
          },
        },
      });
    }
  }

  return (
    <BaseInput
      {..._.merge(propsFromFormState, props)}
      {...controller.field}
      ref={form.register(name).ref}
      // Meta values are ignored here. There are used only in FilterInput.
      onChange={(value: any) => {
        controller.field.onChange(value);
        props.onChange?.(value);
      }}
    />
  );
};
