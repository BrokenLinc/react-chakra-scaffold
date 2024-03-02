import * as UI from '@@ui';
import React from 'react';

import { faBars } from '@fortawesome/free-solid-svg-icons';

export const DraggableRow = React.forwardRef<
  HTMLDivElement,
  UI.StackProps & { color?: String; handleProps?: UI.BoxProps }
>(({ children, color, handleProps, ...stackProps }, ref) => {
  const pressed = !!stackProps['aria-pressed'];
  return (
    <UI.Stack
      ref={ref}
      direction="row"
      spacing="0"
      bg="white"
      borderRadius="lg"
      shadow="md"
      position="relative"
      zIndex={pressed ? 1 : 0}
      {...stackProps}
    >
      <UI.Flex
        dir="column"
        flex="0 0 auto"
        alignItems="center"
        justifyContent="center"
        px="3"
        className="drag-handle"
        color={color ? color : 'gray.500'}
        {...handleProps}
      >
        <UI.Icon icon={faBars} />
      </UI.Flex>
      <UI.Box flex="1 1 auto">{children}</UI.Box>
    </UI.Stack>
  );
});
