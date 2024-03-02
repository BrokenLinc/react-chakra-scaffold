import { formatDateOnly, getDateOnlyFromDate } from '@@helpers/dateOnlyHelpers';
import { subtypeMetas } from '@@helpers/subtypeMetas';
import * as UI from '@@ui';
import { useToast } from '@@ui';
import { faCalendarAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import React from 'react';
import {
  SingleDatepicker,
  SingleDatepickerProps,
} from './chakra-dayzed-datepicker';
import { MaskedInput } from './MaskedInput';

const defaultProps: Partial<DateInputProps> = {
  configs: {
    dateFormat: 'MM/dd/yyyy',
  },
};

/**
 * A wrapper for the SingleDatepicker component that provides default props.
 */
export type DateInputProps = SingleDatepickerProps;
export const DateInput: React.FC<DateInputProps> = (props) => {
  const toast = useToast();
  const { date, onDateChange } = props;
  const formattedDate = date ? formatDateOnly(getDateOnlyFromDate(date)) : '';
  const [inputValue, setInputValue] = React.useState<string>(formattedDate);

  /**
   * Attempt to commit the changes when the input loses focus.
   * If invalid, revert to the previous value.
   */
  const handleBlur = () => {
    // if the input is blank, clear the date
    if (inputValue === '') {
      onDateChange(null as unknown as Date);
      return;
    }

    // check for bad input or disabled dates
    let isValid = true;
    if (isNaN(new Date(inputValue).getTime())) {
      isValid = false;
    } else if (props.getDateDisabled?.(new Date(inputValue))) {
      isValid = false;
    } else if (props.minDate && new Date(inputValue) < props.minDate) {
      isValid = false;
    } else if (props.maxDate && new Date(inputValue) > props.maxDate) {
      isValid = false;
    }

    if (isValid) {
      // set the date value
      onDateChange(new Date(inputValue));
    } else {
      // revert input to match the date
      setInputValue(formattedDate);
      toast({
        title: 'Invalid Date',
        description: 'The input value has been reverted.',
        status: 'error',
      });
    }
  };

  /**
   * Blur the input when the user presses enter.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  /**
   * If the value prop changes, update the input value.
   * Check if the underlying date value has actually changed
   * (Don't interrupt formatting edits to the input value mid-edit)
   */
  React.useEffect(() => {
    if (formattedDate !== inputValue) {
      setInputValue(formattedDate);
    }
  }, [formattedDate]);

  return (
    <UI.Box position="relative" w="full">
      <SingleDatepicker {..._.merge({}, defaultProps, props)}>
        <UI.Button
          position="absolute"
          zIndex={2}
          top={1}
          left={1}
          preset="subtle"
          size="sm"
          px={2}
          isDisabled={props.disabled}
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
        </UI.Button>
      </SingleDatepicker>
      <MaskedInput
        maskGenerator={subtypeMetas.dateonly.mask}
        keepMask
        value={inputValue}
        onChange={(e) => {
          if (typeof e === 'string') {
            setInputValue(e);
            return;
          }
          setInputValue(e.target?.value);
        }}
        onBlur={handleBlur}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="mm/dd/yyyy"
        data-lpignore="true"
        pl="44px"
        disabled={props.disabled}
      />
      <UI.Button
        position="absolute"
        zIndex={2}
        top={0}
        right={0}
        variant="ghost"
        onClick={() => onDateChange(null as unknown as Date)}
        isDisabled={props.disabled}
        color="gray.500"
        _hover={{ bg: 'transparent', color: 'inherit' }}
      >
        <FontAwesomeIcon icon={faClose} />
      </UI.Button>
    </UI.Box>
  );
};
