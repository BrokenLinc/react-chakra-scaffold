import * as UI from '@@ui';
import React from 'react';

export const DividerHeading: React.FC<UI.HeadingProps> = (props) => {
  return (
    <UI.Heading
      borderBottom="1px solid"
      borderColor="gray.500"
      textTransform="uppercase"
      color="gray.500"
      size="md"
      pb={2}
      pt={4}
      {...props}
    />
  );
};
