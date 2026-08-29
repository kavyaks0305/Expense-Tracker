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

import { TableProps } from "./types";

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
}: TableProps<T>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    [],
  );

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

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

  return (
    <div className={`table ${className ?? ""}`}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
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
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="loading">
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty">
                No records found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
