import React from "react";
import "./Table.scss";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { useVirtualizer } from "@tanstack/react-virtual";

import { TableProps } from "./types";

import TooltipCell from "./TooltipCell";

function Table<T extends object>({
  data,
  columns,
  loading = false,
  enableSorting = true,
  enableRowSelection = false,
  sorting,
  className,
  onSortingChange,
  onRowSelectionChange,
  onLoadMore,
  hasMore = false,
}: TableProps<T>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    [],
  );

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  /*
   * Table instance
   */
  const table = useReactTable({
    data,
    columns,

    state: {
      sorting: sorting ?? internalSorting,
      rowSelection,
    },

    enableSorting,
    enableRowSelection,

    onSortingChange: onSortingChange ?? setInternalSorting,

    onRowSelectionChange: (updater) => {
      const value =
        typeof updater === "function" ? updater(rowSelection) : updater;

      setRowSelection(value);
      onRowSelectionChange?.(value);
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  /*
   * Scroll container
   *
   * IMPORTANT:
   * This is the element that actually scrolls.
   */
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rows = table.getRowModel().rows;

  /*
   * TanStack Virtual
   */
  const rowVirtualizer = useVirtualizer({
    count: rows.length,

    getScrollElement: () => parentRef.current,

    estimateSize: () => 42,

    overscan: 5,
  });

  /*
   * Infinite scrolling
   */
  const virtualItems = rowVirtualizer.getVirtualItems();

  React.useEffect(() => {
    if (!virtualItems.length) {
      return;
    }

    const lastItem = virtualItems[virtualItems.length - 1];

    /*
     * Start loading the next page when the user
     * gets close to the last rendered row.
     */
    if (lastItem.index >= rows.length - 5 && hasMore && !loading) {
      onLoadMore?.();
    }
  }, [virtualItems, rows.length, hasMore, loading, onLoadMore]);

  /*
   * Calculate grid columns from TanStack column sizes.
   */
  const gridTemplateColumns = table
    .getVisibleLeafColumns()
    // .map((column) => `${column.getSize()}px`)
    .map(() => "minmax(0, 1fr)")
    .join(" ");

  return (
    <div className={`table ${className ?? ""}`}>
      {/* ================= HEADER ================= */}

      <div
        className="table-header"
        style={{
          gridTemplateColumns,
        }}
      >
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <div
              key={header.id}
              className="table-header-cell"
              onClick={header.column.getToggleSortingHandler()}
            >
              <div className="header">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}

                {header.column.getCanSort() && (
                  <span>
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? ""}
                  </span>
                )}
              </div>
            </div>
          )),
        )}
      </div>

      {/* ================= BODY ================= */}

      <div ref={parentRef} className="table-body">
        {rows.length === 0 && !loading ? (
          <div className="empty">No records found</div>
        ) : (
          <div
            className="table-rows"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {virtualItems.map((virtualRow) => {
              const row = rows[virtualRow.index];

              return (
                <div
                  key={row.id}
                  className="table-row"
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    gridTemplateColumns,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="table-cell">
                      <TooltipCell>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TooltipCell>
                      {/* {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )} */}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Loading indicator */}

        {loading && <div className="table-loading">Loading...</div>}
      </div>
    </div>
  );
}

export default Table;
