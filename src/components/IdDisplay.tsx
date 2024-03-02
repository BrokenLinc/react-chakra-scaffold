import { getColorFromString } from '@@helpers/colorHelpers';
import * as UI from '@@ui';
import React from 'react';

export const IdDisplay: React.FC<{ value?: string | number | null }> = ({
  value,
}) => {
  if (!value) {
    return <React.Fragment>—</React.Fragment>;
  }

  const color = getColorFromString(value.toString());

  return (
    <UI.InputGroup size="xs">
      <UI.InputLeftAddon
        bg={color}
        borderColor={color}
        borderLeftRadius="md"
        px={1}
      />
      <UI.Input
        borderColor={color}
        minW="60px"
        isReadOnly
        value={value}
        textOverflow="ellipsis"
        onFocus={(e) => e.target.select()}
      />
    </UI.InputGroup>
  );
};
