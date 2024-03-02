import { SearchInputDeletedFilter, SearchInputFilter } from '@@api/types';
import { SubtypeMetaKey } from '@@helpers/subtypeMetas';
import { DeepKeys } from '@@helpers/tsHelpers';

type TypeString =
  | 'text'
  | 'number'
  | 'date'
  | 'dateonly'
  | 'datetimeonly'
  | 'boolean';

export type DataGridRow =
  | {
      id: string | number;
      isDeleted?: boolean;
    }
  | {
      _seq?: number; // Historical Logs' primary key
      isDeleted?: boolean;
    };

export type DataGridColumnMeta = {
  type?: TypeString;
  format?: (value: any) => React.ReactNode;
  subtype?: SubtypeMetaKey;
  options?: { label: string | number; value: any }[];
  trueFalseLabels?: [string, string];
  dateFormat?: string; // date-fns format, used by ValueDisplay and chakra-dayzed-datepicker
};

export type DataGridColumn<T extends DataGridRow> = {
  key: DeepKeys<T>;
  header?: React.ReactNode;
  sortable?: boolean;
  sortableKeys?: DeepKeys<T>[];
  meta?: DataGridColumnMeta;
  cell?: (row: T) => React.ReactNode;
  width?: string;
};
export type PaginationParams = {
  pageIndex?: number;
  pageSize?: number;
};

export type SortDirection = 'ASC' | 'DESC';

export type SortingOptions<T extends DataGridRow> = {
  field: DeepKeys<T>;
  direction: SortDirection;
};

export type DataGridParams<T extends DataGridRow> = {
  globalSearch?: string;
  deletedFilter?: SearchInputDeletedFilter;
  pagination?: PaginationParams;
  sortingOptions?: SortingOptions<T>[];
  defaultIsExpanded?: boolean;
  filters?: SearchInputFilter[];
};

export type DataGridState<T extends DataGridRow> = {
  columns: DataGridColumn<T>[];
  rows?: T[];
  pageCount?: number;
  params?: DataGridParams<T>;
  tempParams?: DataGridParams<T>;
};
