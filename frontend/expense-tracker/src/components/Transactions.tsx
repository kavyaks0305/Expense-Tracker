import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useState } from "react";
import { getTransactions } from "../api/transactions";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEdit from "@mui/icons-material/ModeEdit";

import "./Transactions.scss";
import CommonButton from "./common/Button";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

const modules = [AllCommunityModule];

export default function AggridTable() {
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                height: "100%",
              }}
            >
              <IconButton
                color="gray"
                aria-label="add an alarm"
                onClick={() => handleEdit(transaction)}
              >
                <ModeEdit sx={{ fontSize: 20 }} />
              </IconButton>

              <IconButton
                color="large"
                aria-label="add an alarm"
                onClick={() => handleDelete(transaction)}
              >
                <DeleteIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </div>
          );
        },
      },
    ],
    [],
  );
  const [loading, setLoading] = useState(false);

  const handleDelete = (transaction: any) => {
    //todo
  };

  const handleEdit = (transcation: any) => {
    // todo
  };

  const navigate = useNavigate();

  const onAddTransaction = () => {
    navigate("/transactions/add");
  };
  const onGridReady = useCallback((params) => {
    const dataSource = {
      rowCount: undefined,

      getRows: async (params) => {
        const { startRow, endRow, successCallback, failCallback } = params;

        try {
          setLoading(true);

          const pageSize = endRow - startRow;
          const page = Math.floor(startRow / pageSize) + 1;

          const response = await getTransactions({
            page,
            pageSize: pageSize,
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
  }, []);

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
            infiniteInitialRowCount={1000}
            maxBlocksInCache={50}
            onGridReady={onGridReady}
            loading={loading}
          />
        </div>
      </AgGridProvider>
    </div>
  );
}
