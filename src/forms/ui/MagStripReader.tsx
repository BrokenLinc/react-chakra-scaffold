import { MagStripData, parseMagStripString } from '@@helpers/ccHelpers';
import * as UI from '@@ui';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDebounce, usePrevious } from 'react-use';

/**
 * A component that reads a magnetic strip card and returns the data.
 *
 * How it works:
 * 1. The user clicks the button to get ready to read a card.
 * 2. This puts focus on a hidden textarea.
 * 3. The user swipes the card, which populates the textarea with the raw card data.
 * 4. The textarea's value is debounced, and when it stops changing, the data is parsed.
 * 5. The parsed data is returned to the parent component.
 */

export const MagStripReader: React.FC<
  UI.StackProps & {
    onRead: (value: MagStripData | null) => any;
  }
> = ({ onRead, ...restProps }) => {
  const toast = UI.useToast();
  const [value, setValue] = React.useState('');
  const previousValue = usePrevious(value) ?? value;
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const getReady = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleInputComplete = async (value: string) => {
    const data = parseMagStripString(value);
    if (!data) {
      setValue('');
      toast({
        title: 'Error reading card',
        description: 'Please try again.',
        status: 'error',
      });
      return;
    }

    toast({
      title: 'Card read successfully.',
      status: 'success',
    });
    await onRead(data);
    inputRef.current?.blur();
    setValue('');
  };

  useDebounce(
    () => {
      // Don't fire if the value is cleared or hasn't changed
      if (!value || value === previousValue) return;
      handleInputComplete(value);
    },
    500, // wait 0.5s after input stops changing before parsing
    [value, previousValue]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const state = value ? 'reading' : isFocused ? 'ready' : 'idle';

  return (
    <UI.Box {...restProps}>
      {state === 'idle' ? (
        <UI.HStack
          border="1px solid"
          borderColor="purple.300"
          borderRadius="lg"
          bg="purple.100"
          color="purple.500"
          spacing={3}
          p={1}
        >
          <UI.Button
            colorScheme="purple"
            variant="outline"
            bg="white"
            size="sm"
            onClick={getReady}
          >
            Prepare to Swipe Card
          </UI.Button>
          <UI.Text fontSize="sm" fontWeight="bold">
            Status: Not ready to swipe.
          </UI.Text>
        </UI.HStack>
      ) : null}
      {state === 'ready' ? (
        <UI.HStack
          border="1px solid"
          borderColor="purple.300"
          borderRadius="lg"
          bg="purple.100"
          color="purple.500"
          spacing={3}
          px={4}
          h="42px"
          justifyContent="center"
        >
          <FontAwesomeIcon icon={faCreditCard} />
          <UI.Text color="purple.500" fontWeight="bold" fontSize="sm">
            Ready to swipe card...
          </UI.Text>
        </UI.HStack>
      ) : null}
      {state === 'reading' ? (
        <UI.HStack
          border="1px solid"
          borderColor="green.300"
          borderRadius="lg"
          bg="green.50"
          color="green.500"
          spacing={3}
          p={2}
          h="42px"
          justifyContent="center"
        >
          <UI.Spinner color="green.500" />
          <UI.Text fontWeight="bold" fontSize="sm">
            Reading Card
          </UI.Text>
        </UI.HStack>
      ) : null}
      <UI.Textarea
        ref={inputRef}
        onChange={handleChange}
        onBlur={() => setIsFocused(false)}
        pointerEvents="none"
        opacity={0}
        position="absolute"
        width="0"
      />
    </UI.Box>
  );
};
