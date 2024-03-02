import * as UI from '@@ui';
import React from 'react';

/**
 * This component demonstrates the minimal form setup. There is no
 * modification to the layout, custom labels or other styling. Creating a
 * form this way is a good first step to getting everything on the page and
 * validating.
 * */

export const WumpusFormGrid: React.FC = () => {
  return (
    <UI.Card>
      <UI.CardBody>
        <UI.FormGrid maxColumns={2} maxWidth="550px">
          <UI.FormField name="firstName" requiredStyling />
          <UI.FormField name="lastName" />
          <UI.FormField name="phone" type="phone" />
          <UI.FormField name="businessPhone" type="businessPhone" />
          <UI.FormField name="email" type="email" />
          <UI.FormField name="zip" type="zip" />
          <UI.FormField name="profilePhoto" type="photo" />
          <UI.FormField name="isActive" type="switch" />
          <UI.FormField name="bio" type="textarea" span="lg" />
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
            span="sm"
          />
          <UI.FormField name="price" type="money" span="sm" />
          <UI.FormField name="deadline" type="date" />
          <UI.FormField name="eventDates" type="daterange" />
          <UI.FormField
            name="agreedToTerms"
            label="Terms & Conditions"
            type="checkbox"
            input={{
              label: 'I have read and agree to the terms and conditions.',
            }}
            span="lg"
          />
        </UI.FormGrid>
      </UI.CardBody>
    </UI.Card>
  );
};
