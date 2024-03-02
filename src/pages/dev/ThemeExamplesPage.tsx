import { ColorPalettes, ColorWrapper } from '@@dev-tools/ColorPalettes';
import { ThemeExample, ThemeExampleList } from '@@dev-tools/ThemeExampleView';
import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import React from 'react';

const themeExamples: ThemeExample[] = [
  {
    title: 'Gray',
    description: 'Values',
    render: () => (
      <ColorWrapper>
        <ColorPalettes color="gray" />
      </ColorWrapper>
    ),
  },
  {
    title: 'Red',
    description: 'Values',
    render: () => (
      <ColorWrapper>
        <ColorPalettes color="red" />
      </ColorWrapper>
    ),
  },
  {
    title: 'Orange',
    description: 'Values',
    render: () => (
      <ColorWrapper>
        <ColorPalettes color="orange" />
      </ColorWrapper>
    ),
  },
  {
    title: 'Yellow',
    description: 'Values',
    render: () => (
      <ColorWrapper>
        <ColorPalettes color="yellow" />
      </ColorWrapper>
    ),
  },
  {
    title: 'Green',
    description: 'Values',
    render: () => (
      <ColorWrapper>
        <ColorPalettes color="green" />
      </ColorWrapper>
    ),
  },
  {
    title: 'Blue',
    description: 'Values',
    render: () => (
      <ColorWrapper>
        <ColorPalettes color="blue" />
      </ColorWrapper>
    ),
  },
  {
    title: 'Purple',
    description: 'Values',
    render: () => (
      <ColorWrapper>
        <ColorPalettes color="purple" />
      </ColorWrapper>
    ),
  },
  {
    title: 'Pink',
    description: 'Values',
    render: () => (
      <ColorWrapper>
        <ColorPalettes color="pink" />
      </ColorWrapper>
    ),
  },
];

export const ThemeExamplesPage: React.FC = () => {
  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.theme()} />
      <UI.Text mb={12} maxW="550px">
        <UI.Link href="https://chakra-ui.com/docs/components" target="blank">
          Chakra UI
        </UI.Link>
        utilizes a theme object to style its components. The theme object
        contains a nested array of values of colors. This page demonstrates the
        new values applied for those colors.
      </UI.Text>

      <ThemeExampleList componentExamples={themeExamples} />
    </React.Fragment>
  );
};

export default ThemeExamplesPage;
