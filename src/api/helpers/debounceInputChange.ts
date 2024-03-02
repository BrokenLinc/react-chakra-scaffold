import debounce from 'debounce-promise';

export const debounceInputChange = (fn: Parameters<typeof debounce>[0]) => {
  return debounce(fn, 250);
};
