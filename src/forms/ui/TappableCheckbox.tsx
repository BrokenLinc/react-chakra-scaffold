import * as UI from '@@ui';
import _ from 'lodash';
import React from 'react';

export type TappableCheckboxProps = UI.CheckboxProps & {
  colorScheme?: string;
  sx?: any;
};

export const TappableCheckbox: React.FC<TappableCheckboxProps> = ({
  colorScheme = 'purple',
  sx,
  ...restProps
}) => {
  return (
    <UI.Checkbox
      size="lg"
      borderRadius="md"
      border="1px solid"
      borderColor={`${colorScheme}.400`}
      colorScheme={colorScheme}
      fontFamily="heading"
      px="3"
      py="2"
      cursor="pointer"
      alignItems="start"
      {...restProps}
      sx={_.merge(
        {
          transition: 'all 0.2s',
          '>input+*': {
            width: '25px',
            height: '25px',
          },
          _hover: {
            borderColor: `${colorScheme}.500`,
            boxShadow: `0 0 0 1px var(--chakra-colors-${colorScheme}-500)`,
          },
          _focus: {
            borderColor: `${colorScheme}.500`,
            boxShadow: `0 0 0 1px var(--chakra-colors-${colorScheme}-500)`,
          },
          _focusVisible: {
            boxShadow: 'none',
          },
          _checked: {
            bg: `${colorScheme}.400`,

            '>span': {
              color: colorScheme == 'orange' ? 'gray.800' : 'white',
            },

            '>input+*': {
              bg: `${colorScheme}.400`,
              borderColor: `${colorScheme}.400`,
            },

            _hover: {
              '>input+*': {
                bg: `${colorScheme}.400`,
                borderColor: `${colorScheme}.400`,
              },
            },
          },
          _disabled: {
            borderColor: `${colorScheme}.200`,
            '>input+*': {
              bg: 'transparent',
            },
            '.chakra-checkbox__control': {
              bg: 'transparent',
              borderColor: `${colorScheme}.200`,
              color: `${colorScheme}.500`,
            },
            _checked: {
              '.chakra-checkbox__control': {
                bg: `${colorScheme}.300`,
              },
            },
          },
        },
        sx
      )}
    />
  );
};
