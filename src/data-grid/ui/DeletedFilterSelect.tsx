import { SearchInputDeletedFilter } from '@@api/types';
import * as UI from '@@ui';

export type DeletedFilterSelectProps = {
  onChange?: (value?: SearchInputDeletedFilter) => any;
} & Partial<Omit<UI.SelectWithOptionsProps, 'onChange'>>;

export const DELETED_OPTIONS: {
  label: string;
  value: SearchInputDeletedFilter;
}[] = [
  { label: 'Deleted', value: 'DELETED' },
  { label: 'All', value: 'ALL' },
];

export function DeletedFilterSelect({
  onChange,
  ...props
}: DeletedFilterSelectProps) {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!e.target.value) return onChange?.();
    onChange?.(e.target.value as SearchInputDeletedFilter);
  };

  return (
    <UI.SelectWithOptions
      onChange={handleChange}
      placeholder="Existing"
      options={DELETED_OPTIONS}
      {...props}
    />
  );
}
