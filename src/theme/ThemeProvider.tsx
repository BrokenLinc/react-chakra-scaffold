import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';

export const theme = extendTheme({});

/**
 * Customizes the Chakra theme and provides it via context.
 */
export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  return <ChakraProvider theme={theme} {...props} />;
};
