import {
  ColumnDef,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";

export interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  sorting?: SortingState;
  className?: string;
  hasMore?: boolean;

  onRowSelectionChange?: (rows: RowSelectionState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onLoadMore?: () => void;
}
