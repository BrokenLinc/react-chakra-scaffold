import { Wumpus, wumpusSchema } from '@@api/wumpusesApi';
import {
  ComponentExample,
  ComponentExampleList,
} from '@@dev-tools/ComponentExampleView';
import { useHookForm } from '@@forms/hooks/useHookForm';
import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDay } from 'date-fns';
import _ from 'lodash';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

// Simulated API query call
const loadPaginationOptions = async (q: string, page: number) => {
  const options = _.times(20, (n) => {
    const i = 1 + n + 20 * (page - 1);
    return {
      value: i,
      label: `Option ${i}`,
    };
  });

  return { options, meta: { hasNextPage: page <= 2 } };
};

const componentExamples: ComponentExample[] = [
  {
    title: 'Combobox Paginated',
    description:
      'Ideal for choosing from a long list of options (sync), or a list of dynamic options (async). Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField
          name="location1Id"
          type="combobox-paginated"
          input={{
            loadOptions: loadPaginationOptions,
          }}
        />
        <FieldValuePreview name="location1Id" />
        <UI.FormField
          name="location2Id"
          type="combobox-paginated"
          input={{
            loadOptions: loadPaginationOptions,
          }}
        />
        <FieldValuePreview name="location2Id" />
      </React.Fragment>
    ),
  },
  {
    title: 'CheckboxGroup',
    description: '',
    render: () => {
      const fruitOptions = [
        { label: 'Apples', value: 1 },
        { label: 'Bananas', value: 2 },
        { label: 'Cantaloupe', value: 3 },
        { label: 'Dragon Fruit', value: 4 },
        { label: 'Figs', value: 5 },
      ];
      return (
        <React.Fragment>
          <UI.FormField
            name="fruit"
            type="checkboxGroup"
            input={{
              options: fruitOptions,
              getCheckboxValue: (value) => value.id,
              getOutputValue: (value) => ({ id: _.toNumber(value) }),
            }}
          />
          <UI.FormField
            name="fruit"
            label="Fruity Foods"
            type="checkboxGroup"
            input={{
              options: fruitOptions,
              getCheckboxValue: (value) => value.id,
              getOutputValue: (value) => ({ id: _.toNumber(value) }),
            }}
            requiredStyling
            span="sm"
          />
          <FieldValuePreview name="fruit" />
        </React.Fragment>
      );
    },
  },
  {
    title: 'Checkbox',
    description:
      'Ideal for agreeing or approving of things. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="agreedToTermsAndConditions" type="checkbox" />
        <UI.FormField
          name="agreedToTermsAndConditions"
          type="checkbox"
          label="Terms & Conditions"
          input={{
            label: 'I have read and agree to the terms & conditions',
          }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="agreedToTermsAndConditions" />
      </React.Fragment>
    ),
  },
  {
    title: 'Date',
    description: 'Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="deadline" type="date" />
        <FieldValuePreview name="deadline" />
        <UI.FormField
          name="deadlineRestricted"
          type="date"
          label="Deadline"
          input={{
            minDate: new Date(),
            getDateDisabled: (date) => {
              const day = getDay(date);
              return day === 0 || day === 6; // Disable weekends
            },
          }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="deadlineRestricted" />
      </React.Fragment>
    ),
  },

  {
    title: 'Dateparts',
    description: 'Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="deadline" type="dateparts" />
        <UI.FormField
          name="deadline"
          type="dateparts"
          label="Birthday"
          input={{ size: 'sm' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="deadline" />
      </React.Fragment>
    ),
  },

  {
    title: 'Daterange',
    description: 'Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="eventDates" type="daterange" />
        <UI.FormField
          name="eventDates"
          type="daterange"
          label="Event Start & End"
          input={{ minDate: new Date() }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="eventDates" />
      </React.Fragment>
    ),
  },

  {
    title: 'Email',
    description: 'Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="email" type="email" />
        <UI.FormField
          name="email"
          type="email"
          label="Email"
          input={{ placeholder: 'eg. demo@example.com' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="email" />
      </React.Fragment>
    ),
  },

  {
    title: 'File',
    description:
      'Works with FileList values. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="file" label="Single File" type="file" />
        <FieldValuePreview name="file" />
        <UI.FormField
          name="files"
          label="Multiple PDFs"
          type="file"
          input={{ multiple: true, accept: 'application/pdf' }}
        />
        <FieldValuePreview name="files" />
      </React.Fragment>
    ),
  },

  {
    title: 'Money',
    description:
      'Supports decimal-first input with auto-formatting. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="price" type="money" />
        <UI.FormField
          name="price"
          type="money"
          input={{ placeholder: 'eg. $1.23' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="price" />
      </React.Fragment>
    ),
  },

  {
    title: 'Number',
    description:
      'Only allows numeric input, and includes additional formatting. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="percent" type="number" />
        <UI.FormField
          name="percent"
          type="number"
          label="Percent"
          input={{ suffix: '%', placeholder: 'eg. 50%' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="percent" />
      </React.Fragment>
    ),
  },

  {
    title: 'Password',
    description: 'Obscures the input. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="password" type="password" />
        <UI.FormField
          name="password"
          type="password"
          label="Password"
          input={{ placeholder: 'eg. monkey123' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="password" />
      </React.Fragment>
    ),
  },

  {
    title: 'Phone',
    description:
      'Applies masking in the UI. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="phone" type="phone" />
        <UI.FormField
          name="phone"
          type="phone"
          label="Phone"
          input={{ placeholder: 'eg. (555) 555-5555' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="phone" />
      </React.Fragment>
    ),
  },

  {
    title: 'Photo',
    description:
      "Accesses the device's camera and populates the field value with a data URL. Shown with minimum and extra props.",
    render: () => (
      <React.Fragment>
        <UI.FormField name="profilePhoto" type="photo" />
        <UI.FormField
          name="profilePhoto"
          type="photo"
          label="Profile Photo"
          input={{}}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="profilePhoto" />
      </React.Fragment>
    ),
  },

  {
    title: 'Radio',
    description:
      'Ideal for displaying a list of 4 or less preset options. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField
          name="pet"
          type="radio"
          input={{
            options: [
              { label: 'Cat', value: 'cat' },
              { label: 'Dog', value: 'dog' },
              { label: 'Iguana', value: 'iguana' },
            ],
          }}
        />
        <UI.FormField
          name="pet"
          label="Pet"
          type="radio"
          input={{
            options: [
              { label: 'Cat', value: 'cat' },
              { label: 'Dog', value: 'dog' },
              { label: 'Iguana', value: 'iguana' },
            ],
            direction: 'horizontal',
          }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="pet" />
      </React.Fragment>
    ),
  },

  {
    title: 'Rich Text',
    description:
      'Rich text editor with HTML formatting. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="htmlContent" label="Html content" type="richtext" />
        <UI.FormField
          name="htmlContent"
          type="richtext"
          label="Html content"
          requiredStyling
          span="lg"
        />
        <FieldValuePreview name="htmlContent" />
      </React.Fragment>
    ),
  },

  {
    title: 'Select',
    description:
      'Ideal for displaying a list of 5 or more preset options. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField
          name="color"
          type="select"
          input={{
            options: [
              { label: 'Red', value: 'red' },
              { label: 'Green', value: 'green' },
              { label: 'Blue', value: 'blue' },
              { label: 'Yellow', value: 'yellow' },
            ],
          }}
        />
        <UI.FormField
          name="color"
          label="Color"
          type="select"
          input={{
            options: [
              { label: 'Red', value: 'red' },
              { label: 'Green', value: 'green' },
              { label: 'Blue', value: 'blue' },
              { label: 'Yellow', value: 'yellow' },
            ],
            placeholder: 'Choose a color',
          }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="color" />
      </React.Fragment>
    ),
  },

  {
    title: 'Signature',
    description: 'Capturing a signature from the user.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="signature" type="signature" />
        <FieldValuePreview name="signature" />
      </React.Fragment>
    ),
  },

  {
    title: 'Switch',
    description:
      'Ideal for turning things on and off. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="isActive" type="switch" />
        <UI.FormField
          name="isActive"
          type="switch"
          label="Notification Settings"
          input={{ label: 'Notify me of changes via email' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="isActive" />
      </React.Fragment>
    ),
  },

  {
    title: 'Text',
    description: 'The default type. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="firstName" />
        <UI.FormField
          name="firstName"
          type="text"
          label="First Name"
          input={{ placeholder: 'eg. John Doe' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="firstName" />
      </React.Fragment>
    ),
  },

  {
    title: 'Textarea',
    description: 'Multiline text. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="bio" type="textarea" />
        <UI.FormField
          name="bio"
          type="textarea"
          label="Bio"
          input={{ placeholder: 'I was born in a small midwest town.' }}
          requiredStyling
          span="lg"
        />
        <FieldValuePreview name="bio" />
      </React.Fragment>
    ),
  },

  {
    title: 'Timeonlyparts',
    description: 'Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="alarm" type="timeonlyparts" />
        <UI.FormField
          name="alarm"
          type="timeonlyparts"
          label="Alarm time"
          input={{
            minuteIncrements: 15,
            size: 'sm',
          }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="alarm" />
      </React.Fragment>
    ),
  },

  {
    title: 'WorkPhone',
    description:
      'Applies masking in the UI. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="businessPhone" type="businessPhone" />
        <UI.FormField
          name="businessPhone"
          type="businessPhone"
          label="Office Phone"
          input={{ placeholder: 'eg. (555) 555-5555 x 5555' }}
          requiredStyling
        />
        <FieldValuePreview name="businessPhone" />
      </React.Fragment>
    ),
  },

  {
    title: 'Zip',
    description:
      'Applies masking in the UI. Shown with minimum and extra props.',
    render: () => (
      <React.Fragment>
        <UI.FormField name="zip" type="zip" />
        <UI.FormField
          name="zip"
          type="zip"
          label="Zip Code"
          input={{ placeholder: 'eg. 90210' }}
          requiredStyling
          span="sm"
        />
        <FieldValuePreview name="zip" />
      </React.Fragment>
    ),
  },
];

const FieldValuePreview: React.FC<{ name: string }> = ({ name }) => {
  const form = useFormContext();
  const controller = useController({
    name,
    control: form.control,
  });

  return (
    <UI.Box w="full">
      <UI.FormLabel>Field data</UI.FormLabel>
      <UI.Code colorScheme="purple" px={3} py={2} borderRadius="md" w="full">
        {JSON.stringify(controller.field.value, null, 0) || (
          <UI.Text fontStyle="italic" opacity={0.5}>
            undefined
          </UI.Text>
        )}
      </UI.Code>
    </UI.Box>
  );
};

const FormInputExamplesPage: React.FC = () => {
  const form = useHookForm<Wumpus>({
    resolver: zodResolver(wumpusSchema),
    defaultValues: {
      location2Id: 1,
      location2: { id: 1, name: 'Archer Road' }, // Combobox pre-population
      location4Id: 1,
      location4: { id: 1, name: 'Archer Road' }, // Combobox pre-population
      deadlineRestricted: new Date('2023-12-26'),
    },
    onValid: (data) => {
      console.log('onValid', data);
      // This function can be async, and can throw errors to users.
    },
  });

  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.formInputs()} />
      <UI.Text mb={12} maxW="550px">
        This screen demonstrates the minimal usage and common "extra" props for
        each type of form input.
      </UI.Text>

      <UI.Form form={form}>
        <ComponentExampleList componentExamples={componentExamples} />
      </UI.Form>
    </React.Fragment>
  );
};

export default FormInputExamplesPage;
