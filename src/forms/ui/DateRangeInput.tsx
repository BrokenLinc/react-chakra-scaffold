import _ from 'lodash';
import React from 'react';
import {
  RangeDatepicker,
  RangeDatepickerProps,
} from './chakra-dayzed-datepicker';

/**
 * A wrapper for the RangeDatepicker component that provides default props.
 */
export type DateRangeInputProps = RangeDatepickerProps;
export const DateRangeInput: React.FC<DateRangeInputProps> = (props) => {
  const defaultProps: Partial<DateRangeInputProps> = {
    propsConfigs: {
      inputProps: {
        cursor: 'pointer',
      },
    },
    configs: {
      dateFormat: 'MM/dd/yyyy',
    },
  };
  return <RangeDatepicker {..._.merge(defaultProps, props)} />;
};
