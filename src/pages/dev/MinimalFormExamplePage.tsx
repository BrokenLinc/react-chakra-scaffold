import { Wumpus, wumpusSchema } from '@@api/wumpusesApi';
import { useHookForm } from '@@forms/hooks/useHookForm';
import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';

const MinimalFormExamplePage: React.FC = () => {
  const form = useHookForm<Wumpus>({
    resolver: zodResolver(wumpusSchema),
    defaultValues: {
      // example of default value for autocomplete
      // state: { value: 'FL', label: 'Florida' },
    },
    onValid: (data) => {
      console.log('onValid', data);
      // This function can be async, and can throw errors to users.
    },
  });

  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.minimalForm()} />
      <UI.Text mb={12} maxW="550px">
        This screen demonstrates the minimal form setup. There is no
        modification to the layout, custom labels or other styling. Creating a
        form this way is a good first step to getting everything on the page and
        validating.
      </UI.Text>

      <UI.QuickForm form={form}>
        <UI.FormGrid>
          <UI.FormField name="firstName" requiredStyling />
          <UI.FormField name="lastName" />
          <UI.FormField name="phone" type="phone" requiredStyling />
          <UI.FormField name="email" type="email" requiredStyling />
          <UI.FormField name="profilePhoto" type="photo" requiredStyling />
          <UI.FormField name="bio" type="textarea" requiredStyling />
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
            name="percent"
            type="number"
            input={{ suffix: '%' }}
            requiredStyling
          />
          <UI.FormField name="price" type="money" requiredStyling />
          <UI.FormField name="isActive" type="switch" />
          <UI.FormField name="agreedToTerms" type="checkbox" />
          <UI.FormField name="deadline" type="date" requiredStyling />
          <UI.FormField name="eventDates" type="daterange" requiredStyling />
        </UI.FormGrid>
      </UI.QuickForm>
    </React.Fragment>
  );
};

export default MinimalFormExamplePage;
