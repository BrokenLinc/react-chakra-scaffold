import { convertDateOnlyToJSDate } from '@@helpers/dateOnlyHelpers';
import { format } from 'date-fns';
import React from 'react';
import { DateInput, DateInputProps } from './DateInput';
/**
 * A wrapper for the Date Input that supports a date-only string (yyyy-MM-dd)
 * It converts the string to and from a JS Date object in the system's timezone.
 * This makes it compatible with the date-picker control.
 */
export type DateOnlyInputProps = Omit<
  DateInputProps,
  'date' | 'onDateChange'
> & {
  value?: string | null;
  onChange?: (value: string | null) => any;
};
export const DateOnlyInput: React.FC<DateOnlyInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  // Convert the ISO date-only to a JS Date object in the system's timezone.
  const date = value ? convertDateOnlyToJSDate(value) : undefined;
  const onDateChange = (date: Date | undefined) => {
    // Convert the JS Date object to an ISO date-only string.
    onChange?.(date ? format(date, 'yyyy-MM-dd') : null);
  };
  return <DateInput {...props} date={date} onDateChange={onDateChange} />;
};
