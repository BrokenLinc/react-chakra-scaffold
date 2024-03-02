import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const solid = defineStyle({
  borderColor: 'purple.100',
  opacity: 1,
});

export const dividerTheme = defineStyleConfig({
  variants: { solid },
});
