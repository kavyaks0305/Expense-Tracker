import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useQueryClient } from "@tanstack/react-query";

import ActionCell from "./ActionCell";

import { getTransactions } from "../api/transactions";
import CommonButton from "./common/Button";
import "./Transactions.scss";
import { useDeleteTransaction } from "../queries/useTransactions";

const modules = [AllCommunityModule];

export default function Transactions() {
  const [loading, setLoading] = useState(false);

  const gridApiRef = useRef<any>(null);

  const queryClient = useQueryClient();
  const deleteMutation = useDeleteTransaction();
  const navigate = useNavigate();

  const colDefs = useMemo(
    () => [
      { field: "date" },
      { field: "name" },
      { field: "type" },
      { field: "category" },
      { field: "amount" },
      { field: "paymentMethod" },
      { field: "note" },
      {
        headerName: "",
        field: "actions",
        width: 100,
        sortable: false,
        filter: false,
        pinned: "right",

        cellRenderer: (params) => {
          const transaction = params.data;

          return (
            <ActionCell
              onDelete={() => handleDelete(transaction)}
              onEdit={() => handleEdit(transaction)}
            />
          );
        },
      },
    ],
    [],
  );

  const onGridReady = useCallback(
    (params) => {
      gridApiRef.current = params.api;
      const dataSource = {
        rowCount: undefined,

        getRows: async (params) => {
          const { startRow, endRow, successCallback, failCallback } = params;

          try {
            setLoading(true);

            const pageSize = endRow - startRow;
            const page = Math.floor(startRow / pageSize) + 1;

            const response = await queryClient.fetchQuery({
              queryKey: ["transactions", page, pageSize],
              queryFn: () =>
                getTransactions({
                  page,
                  pageSize: pageSize,
                }),
            });

            const rows = response.items;

            const lastRow =
              response.total != null
                ? response.total
                : rows.length < pageSize
                  ? startRow + rows.length
                  : -1;

            successCallback(rows, lastRow);
          } catch (error) {
            console.error("Failed to load transactions", error);
            failCallback();
          } finally {
            setLoading(false);
          }
        },
      };

      params.api.setGridOption("datasource", dataSource);
    },
    [queryClient],
  );

  const handleDelete = (transaction: any) => {
    deleteMutation.mutate(transaction.id);
    gridApiRef.current?.refreshInfiniteCache();
  };

  const handleEdit = (transcation: any) => {
    // todo
  };

  const onAddTransaction = () => {
    navigate("/transactions/add");
  };

  return (
    <div>
      <div className="transactions__title">Transactions</div>
      <div className="transactions__add-button">
        <CommonButton onClick={onAddTransaction}> Add transaction</CommonButton>
      </div>
      <AgGridProvider modules={modules}>
        <div className="transactions">
          <AgGridReact
            columnDefs={colDefs}
            rowModelType="infinite"
            rowBuffer={0}
            cacheBlockSize={100}
            cacheOverflowSize={2}
            maxConcurrentDatasourceRequests={1}
            infiniteInitialRowCount={10}
            maxBlocksInCache={10}
            onGridReady={onGridReady}
            loading={loading}
          />
        </div>
      </AgGridProvider>
    </div>
  );
}
