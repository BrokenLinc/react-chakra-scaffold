import { DeepKeys } from '@@helpers/tsHelpers';

export type QueryOptions = { enabled?: boolean; suspense?: boolean };

export type SearchInputDeletedFilter = 'ALL' | 'DELETED';

export const searchInputFilterOperators = <const>[
  'eq',
  'gt',
  'gte',
  'lt',
  'lte',
  '!gt',
  '!gte',
  '!lt',
  '!lte',
  '!eq',
  'like',
  'ilike',
  'in',
  '!in',
  'isnull',
  'isnotnull',
];

export type SearchInputFilterOperator =
  (typeof searchInputFilterOperators)[number];

export type SearchInputFilter = {
  field: string;
  value: any;
  operator: SearchInputFilterOperator;
};

export type FindInput = {
  deletedFilter?: SearchInputDeletedFilter;
  includeTypeaheads?: boolean;
};

export type SearchInput<T> = FindInput & {
  globalSearch?: string;
  page?: number;
  take?: number;
  sortingOptions?: {
    field: DeepKeys<T>;
    direction: 'ASC' | 'DESC';
  }[];
  filters?: SearchInputFilter[];
};

export type SearchResultMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type SearchResult<T> = {
  data: T[];
  meta: SearchResultMeta;
};
