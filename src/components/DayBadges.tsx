import * as UI from '@@ui';

const indicatorProps: UI.BadgeProps = {
  flex: 1,
  textAlign: 'center',
};

export const DayBadges: React.FC<
  UI.StackProps & {
    data: {
      monday?: boolean | null;
      tuesday?: boolean | null;
      wednesday?: boolean | null;
      thursday?: boolean | null;
      friday?: boolean | null;
      saturday?: boolean | null;
      sunday?: boolean | null;
    };
    badgeProps?: Partial<UI.IndicatorBadgeProps>;
  }
> = ({ data, badgeProps, ...restProps }) => {
  return (
    <UI.Flex gap="1px" {...restProps}>
      <UI.IndicatorBadge
        {...badgeProps}
        {...indicatorProps}
        active={data.monday}
      >
        M
      </UI.IndicatorBadge>
      <UI.IndicatorBadge
        {...badgeProps}
        {...indicatorProps}
        active={data.tuesday}
      >
        Tu
      </UI.IndicatorBadge>
      <UI.IndicatorBadge
        {...badgeProps}
        {...indicatorProps}
        active={data.wednesday}
      >
        W
      </UI.IndicatorBadge>
      <UI.IndicatorBadge
        {...badgeProps}
        {...indicatorProps}
        active={data.thursday}
      >
        Th
      </UI.IndicatorBadge>
      <UI.IndicatorBadge
        {...badgeProps}
        {...indicatorProps}
        active={data.friday}
      >
        F
      </UI.IndicatorBadge>
      <UI.IndicatorBadge
        {...badgeProps}
        {...indicatorProps}
        active={data.saturday}
      >
        Sa
      </UI.IndicatorBadge>
      <UI.IndicatorBadge
        {...badgeProps}
        {...indicatorProps}
        active={data.sunday}
      >
        Su
      </UI.IndicatorBadge>
    </UI.Flex>
  );
};
