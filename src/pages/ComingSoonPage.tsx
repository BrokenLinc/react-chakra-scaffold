import * as UI from '@@ui';
import React from 'react';

/**
 * This page is loaded in many routes, as a placeholder for pages that are not
 * yet implemented.
 */
export const ComingSoonPage: React.FC = () => {
  return (
    <React.Fragment>
      <UI.Heading mb={6} size="lg">
        Coming soon!
      </UI.Heading>
      <UI.Text>
        Developers: To start working on this page, replace the{' '}
        <strong>ComingSoonPage</strong> component for this route in{' '}
        <strong>routes.ts.</strong>
      </UI.Text>
    </React.Fragment>
  );
};

export default ComingSoonPage;
