import * as UI from '@@ui';
import React from 'react';

const defaultActiveProps: UI.BadgeProps = {
  opacity: 1,
  variant: 'solid',
  colorScheme: 'purple',
  size: 'narrow',
};

const defaultInactiveProps: UI.BadgeProps = {
  opacity: 0.5,
  variant: 'solid',
  colorScheme: 'gray',
  size: 'narrow',
};

export type IndicatorBadgeProps = UI.BadgeProps & {
  active?: boolean | null;
  activeProps?: UI.BadgeProps;
  inactiveProps?: UI.BadgeProps;
};

export const IndicatorBadge: React.FC<IndicatorBadgeProps> = ({
  active,
  activeProps,
  inactiveProps,
  ...restProps
}) => {
  const props = active
    ? { ...defaultActiveProps, ...activeProps }
    : { ...defaultInactiveProps, ...inactiveProps };
  return <UI.Badge {...props} {...restProps} />;
};
