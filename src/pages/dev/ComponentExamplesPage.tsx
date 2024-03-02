import React from 'react';

import {
  ComponentExample,
  ComponentExampleList,
} from '@@dev-tools/ComponentExampleView';

import { useActionFlow } from '@@dialogs/actionFlow';
import { useConfirmation } from '@@dialogs/confirmation';

import { routes } from '@@routing/routes';

import * as UI from '@@ui';
import {
  faArrowRight,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const componentExamples: ComponentExample[] = [
  {
    title: 'Accordion',
    description:
      'Renders a series of expandable links containing content or links. Can be configured to allow multiple items to be expanded at once.',
    render: () => (
      <UI.Accordion allowMultiple w="80">
        <UI.AccordionItem>
          {({ isExpanded }) => (
            <>
              <UI.AccordionButton>
                <UI.Box
                  display="flex"
                  flex="1"
                  textAlign="left"
                  alignItems="center"
                >
                  <UI.Box as="span" flex="1" textAlign="left">
                    Hello
                  </UI.Box>
                  {isExpanded ? (
                    <UI.Icon icon={faMinus} />
                  ) : (
                    <UI.Icon icon={faPlus} />
                  )}
                </UI.Box>
              </UI.AccordionButton>
              <UI.AccordionPanel>
                <p>Hi!</p>
                <p>Hola</p>
                <p>Bonjour</p>
                <p>Yo</p>
              </UI.AccordionPanel>
            </>
          )}
        </UI.AccordionItem>
        <UI.AccordionItem>
          {({ isExpanded }) => (
            <>
              <UI.AccordionButton>
                <UI.Box
                  display="flex"
                  flex="1"
                  textAlign="left"
                  alignItems="center"
                >
                  <UI.Box as="span" flex="1" textAlign="left">
                    Goodbye
                  </UI.Box>
                  {isExpanded ? (
                    <UI.Icon icon={faMinus} />
                  ) : (
                    <UI.Icon icon={faPlus} />
                  )}
                </UI.Box>
              </UI.AccordionButton>
              <UI.AccordionPanel>
                <p>Bye!</p>
                <p>Au Revoir</p>
                <p>Adios</p>
                <p>Sayonara</p>
              </UI.AccordionPanel>
            </>
          )}
        </UI.AccordionItem>
      </UI.Accordion>
    ),
  },
  {
    title: 'AccordionToggler',
    description:
      'Renders buttons to expand and collapse all accordion items. Must be placed inside an Accordion component and assigned the number of items in the accordion.',
    render: () => (
      <UI.Accordion allowMultiple>
        <UI.AccordionItem>
          {({ isExpanded }) => (
            <>
              <UI.AccordionButton>
                <UI.Box
                  display="flex"
                  flex="1"
                  textAlign="left"
                  alignItems="center"
                >
                  <UI.Box as="span" flex="1" textAlign="left">
                    Hello
                  </UI.Box>
                  {isExpanded ? (
                    <UI.Icon icon={faMinus} />
                  ) : (
                    <UI.Icon icon={faPlus} />
                  )}
                </UI.Box>
              </UI.AccordionButton>
              <UI.AccordionPanel>Hi!</UI.AccordionPanel>
            </>
          )}
        </UI.AccordionItem>
        <UI.AccordionItem>
          {({ isExpanded }) => (
            <>
              <UI.AccordionButton>
                <UI.Box
                  display="flex"
                  flex="1"
                  textAlign="left"
                  alignItems="center"
                >
                  <UI.Box as="span" flex="1" textAlign="left">
                    Goodbye
                  </UI.Box>
                  {isExpanded ? (
                    <UI.Icon icon={faMinus} />
                  ) : (
                    <UI.Icon icon={faPlus} />
                  )}
                </UI.Box>
              </UI.AccordionButton>
              <UI.AccordionPanel>Bye!</UI.AccordionPanel>
            </>
          )}
        </UI.AccordionItem>
        <UI.AccordionToggler itemCount={2} />
      </UI.Accordion>
    ),
  },
  {
    title: 'Action Flow',
    description:
      'Can optionally open a confirmation dialog, present toast notifications, and redirect.',
    render: () => {
      const actionFlow = useActionFlow();

      const handleDeleteClick = () => {
        actionFlow(
          async () => true, // simulate successful async API call
          {
            preset: 'delete',
            successRedirectRoute: routes.dev.home().path,
          }
        );
      };

      // const actionFlow = useActionFlow();
      const [status, setStatus] = React.useState<string>();

      const handleGoodDeleteClick = () => {
        setStatus(undefined);
        actionFlow(
          async () => true, // simulate successful async API call
          {
            preset: 'delete',
            confirmation: {
              // These callbacks are only necessary if you want to do something after
              onConfirm: () => setStatus('User confirmed deletion.'),
              onCancel: () => setStatus('User cancelled deletion.'),
            },
            successRedirectRoute: routes.dev.home().path,
          }
        );
      };

      const handleBadDeleteClick = () => {
        setStatus(undefined);
        actionFlow(
          async () => false, // simulate failed async API call
          {
            preset: 'delete',
            confirmation: {
              // These callbacks are only necessary if you want to do something after
              onConfirm: () => setStatus('User confirmed deletion.'),
              onCancel: () => setStatus('User cancelled deletion.'),
            },
            successRedirectRoute: routes.dev.home().path,
          }
        );
      };

      return (
        <UI.VStack>
          <UI.Button onClick={handleGoodDeleteClick}>
            Delete (success demo)
          </UI.Button>
          <UI.Button onClick={handleBadDeleteClick}>
            Delete (error demo)
          </UI.Button>
          {status ? (
            <UI.Text fontWeight="bold" color="purple.500">
              {status}
            </UI.Text>
          ) : null}
        </UI.VStack>
      );
    },
  },
  {
    title: 'AlertMessage',
    description:
      'Renders a preset alert box with a specified message and color-scheme (default: "red").',
    render: () => (
      <UI.VStack alignItems="stretch" w="full">
        <UI.AlertMessage>Oh no!</UI.AlertMessage>
        <UI.AlertMessage colorScheme="purple">Happy birthday!</UI.AlertMessage>
        <UI.AlertMessage colorScheme="orange">Be careful.</UI.AlertMessage>
      </UI.VStack>
    ),
  },
  {
    title: 'Badge',
    description:
      'Renders a static badge with text. Color schemes are associated with certain properties in the application.',
    render: () => (
      <>
        <UI.Text fontWeight="700" mb="1">
          Sizes (controlled by font size)
        </UI.Text>
        <UI.VStack w="full">
          <UI.Badge colorScheme="orange">Default</UI.Badge>
          <UI.Badge colorScheme="orange" fontSize="lg">
            Large Font Size
          </UI.Badge>
        </UI.VStack>
        <UI.Divider mt="6" mb="3" />
        <UI.Text fontWeight="700" mb="1">
          Variants (defaults to 'Solid')
        </UI.Text>
        <UI.VStack w="full">
          <UI.Badge variant="subtle">Subtle</UI.Badge>
          <UI.Badge variant="outline">Outline</UI.Badge>
          <UI.Badge variant="solid">Solid</UI.Badge>
        </UI.VStack>
        <UI.Divider mt="6" mb="3" />
        <UI.Text fontWeight="700" mb="1">
          Colors (defaults to 'orange')
        </UI.Text>
        <UI.VStack w="full">
          <UI.Badge>Default (orange)</UI.Badge>
          <UI.Badge colorScheme="purple">Happy birthday! (purple)</UI.Badge>
          <UI.Badge colorScheme="red">Red</UI.Badge>
          <UI.Badge colorScheme="blue">Blue</UI.Badge>
          <UI.Badge colorScheme="green">Green</UI.Badge>
          <UI.Badge colorScheme="gray">Gray</UI.Badge>
        </UI.VStack>
      </>
    ),
  },
  {
    title: 'Button',
    description:
      'Renders an interactive button. Defaults to a size of "md" and color scheme of "purple".',
    render: () => (
      <>
        <UI.Text fontWeight="700" mb="1">
          Sizes
        </UI.Text>
        <UI.Stack spacing={3} align="center">
          <UI.Button size="xs">Button XS</UI.Button>
          <UI.Button size="sm">Button SM</UI.Button>
          <UI.Button size="md">Button MD</UI.Button>
          <UI.Button size="lg">Button LG</UI.Button>
        </UI.Stack>
        <UI.Divider my="6" />
        <UI.Text fontWeight="700" mb="1">
          Presets
        </UI.Text>
        <UI.Stack spacing={3} align="center">
          <UI.Button preset="primary">Button Primary</UI.Button>
          <UI.Button preset="secondary">Button Secondary</UI.Button>
        </UI.Stack>
      </>
    ),
  },
  {
    title: 'Button with Icon',
    description:
      'Renders an interactive button with icon add-on. Utilizes the custom Icon component and FontAwesome.',
    render: () => (
      <>
        <UI.Stack spacing={3} align="center">
          <UI.Button preset="primary" iconBefore={faPlus}>
            Button with Left Icon
          </UI.Button>
          <UI.Button preset="secondary" iconAfter={faArrowRight}>
            Button with Right Icon
          </UI.Button>
        </UI.Stack>
      </>
    ),
  },
  {
    title: 'Icon Button',
    description:
      'Renders an interactive button with only an icon as its content.',
    render: () => (
      <>
        <UI.HStack spacing={3} align="center">
          <UI.IconButton
            size="xs"
            icon={<FontAwesomeIcon icon={faPlus} />}
            aria-label="Start Now"
          />
          <UI.IconButton
            size="sm"
            icon={<FontAwesomeIcon icon={faPlus} />}
            aria-label="Start Now"
          />
          <UI.IconButton
            icon={<FontAwesomeIcon icon={faPlus} />}
            aria-label="Start Now"
          />
          <UI.IconButton
            size="lg"
            icon={<FontAwesomeIcon icon={faPlus} />}
            aria-label="Start Now"
          />
        </UI.HStack>
        <UI.HStack spacing={3} align="center">
          <UI.IconButton
            size="xs"
            icon={<FontAwesomeIcon icon={faPlus} />}
            aria-label="Start Now"
          />
        </UI.HStack>
      </>
    ),
  },
  {
    title: 'Card',
    description: 'Renders a card wrapper with header, body, and footer.',
    noBorder: true,
    render: () => (
      <UI.Card w="full">
        <UI.CardHeader>
          <UI.Flex justify="space-between" alignItems="center">
            <UI.Text fontWeight="bold">Card Label</UI.Text>
            <UI.Button colorScheme="purple" size="sm">
              Button label
            </UI.Button>
          </UI.Flex>
        </UI.CardHeader>
        <UI.CardBody>Card Body</UI.CardBody>
        <UI.CardFooter>
          <UI.Button>Button label</UI.Button>
        </UI.CardFooter>
      </UI.Card>
    ),
  },
  {
    title: 'Checkbox',
    description: 'Renders a standard checkbox input of various sizes.',
    render: () => (
      <>
        <UI.Stack spacing={3} align="center">
          <UI.Checkbox>Checkbox</UI.Checkbox>
          <UI.Checkbox defaultChecked>Checkbox checked</UI.Checkbox>
          <UI.Checkbox isDisabled>Checkbox disabled</UI.Checkbox>
          <UI.Checkbox isDisabled defaultChecked>
            Checkbox disabled checked
          </UI.Checkbox>
          <UI.Checkbox size="lg">Checkbox large (default)</UI.Checkbox>
          <UI.Checkbox size="xl">Checkbox XL</UI.Checkbox>
        </UI.Stack>
      </>
    ),
  },
  {
    title: 'Confirmation',
    description:
      'Opens a dialog that asks the user to confirm or cancel an action.',
    render: () => {
      const confirmation = useConfirmation();
      const [status, setStatus] = React.useState<string>();

      const handleClick = () => {
        setStatus(undefined);
        confirmation.open({
          title: 'Are you sure?',
          message: 'This action cannot be undone.',
          confirmLabel: 'Yes, I am sure',
          cancelLabel: 'No, cancel',
          onConfirm: () => setStatus('User confirmed.'),
          onCancel: () => setStatus('User cancelled.'),
        });
      };

      return (
        <UI.VStack>
          <UI.Button onClick={handleClick}>Confirm</UI.Button>
          {status ? (
            <UI.Text fontWeight="bold" color="purple.500">
              {status}
            </UI.Text>
          ) : null}
        </UI.VStack>
      );
    },
  },
  {
    title: 'FieldSet',
    description:
      'Renders a fieldset tag which is styled to encapsulate a portion of a multi-part form.',
    render: () => (
      <UI.FieldSet title="Basic Info" w="full">
        <UI.Text>I love you.</UI.Text>
      </UI.FieldSet>
    ),
  },
  {
    title: 'Text Input Fields',
    description:
      'Renders different text form fields types Defaults to a size of "md" and variant of "outline".',
    render: () => (
      <UI.Box textAlign="left">
        <UI.Text fontWeight="700" mb="1">
          Sizes
        </UI.Text>
        <UI.Stack spacing={3}>
          <UI.Input placeholder="extra small size" size="xs" />
          <UI.Input placeholder="small size" size="sm" />
          <UI.Input placeholder="medium size (default)" />
          <UI.Input placeholder="large size" size="lg" />
        </UI.Stack>
        <UI.Text fontWeight="700" mb="1" mt="4">
          Variants
        </UI.Text>
        <UI.Stack spacing={3}>
          <UI.Input placeholder="Outline (default)" />
          <UI.Input placeholder="Filled" variant="filled" />
        </UI.Stack>
        <UI.Text fontWeight="700" mb="1" mt="4">
          States
        </UI.Text>
        <UI.Stack spacing={3}>
          <UI.Input placeholder="Base input" />
          <UI.Input placeholder="Disabled input" isDisabled />
          <UI.Input placeholder="Invalid input value" isInvalid />
          <UI.Input placeholder="Read only input" isReadOnly />
        </UI.Stack>
      </UI.Box>
    ),
  },
  {
    title: 'MagStripReader',
    description:
      'A component that captures input from a USB magnetic strip reader, for card payment. Note: You can simulate a failed swipe by face-rolling keys on your keyboard.',
    render: () => <UI.MagStripReader onRead={console.log} />,
  },
  {
    title: 'Modal',
    description: 'Opens a pre-styled and simple dialog.',
    render: () => {
      const modal = UI.useDisclosure();
      const modal2 = UI.useDisclosure();

      return (
        <UI.VStack>
          <UI.Button onClick={modal.onOpen}>Simple Modal</UI.Button>
          <UI.QuickModal {...modal} headerContent="Example Modal">
            <UI.ModalBody pb={6}>
              <p>Hey there</p>
            </UI.ModalBody>
          </UI.QuickModal>
          <UI.Button onClick={modal2.onOpen}>Styled Modal</UI.Button>
          <UI.QuickModal
            {...modal2}
            variant="purple"
            headerContent="Example Modal"
          >
            <UI.ModalBody pb={6}>
              <p>Hey there</p>
            </UI.ModalBody>
            <UI.ModalFooter>
              <UI.Button>Example Button</UI.Button>
            </UI.ModalFooter>
          </UI.QuickModal>
        </UI.VStack>
      );
    },
  },
  {
    title: 'RouteLink',
    description:
      'Renders a nice looking link that can be used to navigate to a route.',
    render: () => (
      <UI.VStack alignItems="start">
        <UI.RouteLink route={routes.home()}>Simple link</UI.RouteLink>.
        <UI.Text>
          Links can even be inline,{' '}
          <UI.RouteLink route={routes.home()}>like this</UI.RouteLink>. Isn't
          that nice?
        </UI.Text>
        <UI.Text>
          You can even open links in a{' '}
          <UI.RouteLink route={routes.home()} target="_blank">
            new window
          </UI.RouteLink>
          . Will wonders never cease?
        </UI.Text>
      </UI.VStack>
    ),
  },
  {
    title: 'RouteLinkButton',
    description:
      'Renders a nice looking button that can be used to navigate to a route. Can be styled like any other button.',
    render: () => (
      <UI.VStack>
        <UI.RouteButton route={routes.home()}>Default button</UI.RouteButton>.
        <UI.RouteButton
          route={routes.home()}
          size="sm"
          variant="outline"
          colorScheme="green"
          shadow="lg"
        >
          Styled button
        </UI.RouteButton>
      </UI.VStack>
    ),
  },
  {
    title: 'Select',
    description: 'Renders a select dropdown form input.',
    render: () => (
      <UI.FormControl>
        <UI.FormLabel>Select Dropdown</UI.FormLabel>
        <UI.Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </UI.Select>
      </UI.FormControl>
    ),
  },
  {
    title: 'Tabs',
    description:
      'Renders a tabbed navigation bar that can be used to switch between views.',
    render: () => (
      <UI.Tabs variant="bar" w="full">
        <UI.TabList>
          <UI.Tab>One</UI.Tab>
          <UI.Tab>Two</UI.Tab>
        </UI.TabList>
        <UI.TabPanels>
          <UI.TabPanel>
            <p>Tab 1</p>
          </UI.TabPanel>
          <UI.TabPanel>
            <p>two!</p>
          </UI.TabPanel>
        </UI.TabPanels>
      </UI.Tabs>
    ),
  },
  {
    title: 'TappableCheckbox',
    description: 'Renders checkbox input with a chunky tappable area.',
    render: () => (
      <UI.VStack spacing={4} alignItems="stretch" w="full">
        <UI.TappableCheckbox>Interactive</UI.TappableCheckbox>
        <UI.TappableCheckbox isChecked={false}>Unchecked</UI.TappableCheckbox>
        <UI.TappableCheckbox isChecked>Checked</UI.TappableCheckbox>
        <UI.TappableCheckbox isDisabled>
          Disabled & unchecked
        </UI.TappableCheckbox>
        <UI.TappableCheckbox isChecked isDisabled>
          Disabled & checked
        </UI.TappableCheckbox>
      </UI.VStack>
    ),
  },
  {
    title: 'WarningWell',
    description:
      'A simple style-preset box for various types of messages. Can have a heading, message, and any additional content.',
    render: () => (
      <UI.VStack spacing={4} alignItems="stretch" w="full">
        <UI.WarningWell heading="Uh oh!" message="Something went wrong." />
        <UI.WarningWell
          heading="Oh yeah!"
          message="Something went right!"
          bg="green.100"
        />
      </UI.VStack>
    ),
  },
];

export const ComponentExamplesPage: React.FC = () => {
  return (
    <React.Fragment>
      <UI.RoutePageTitle route={routes.dev.components()} />
      <UI.Text mb={12} maxW="550px">
        This app's <UI.Code>@ui</UI.Code> module includes all components from{' '}
        <UI.Link href="https://chakra-ui.com/docs/components" target="blank">
          Chakra UI
        </UI.Link>
        , plus a few custom components. This page demonstrates the usage of some
        of the more generic ones. See the other pages in the dev section for
        more examples.
      </UI.Text>

      <ComponentExampleList componentExamples={componentExamples} />
    </React.Fragment>
  );
};

export default ComponentExamplesPage;
