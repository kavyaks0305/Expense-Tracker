import { useEffect, useRef, useState } from "react";
import { addTransaction, getTransactions } from "../api/transactions";
import Table from "./table/Table";

import "./Transactions.scss";
import CommonButton from "./common/Button";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "action",
    header: "",
  },
];

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const parentRef = useRef<HTMLDivElement>(null);

  const getlist = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const response = await getTransactions({
        page: pageNumber,
      });

      setTransactions((previous) =>
        pageNumber === 1 ? response.items : [...previous, ...response.items],
      );

      setHasMore(pageNumber < response.total_pages);
      setPage(pageNumber + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getlist(1);
  }, []);

  const loadMore = () => {
    getlist(page);
  };

  const onAddTransaction = () => {
    navigate("/transactions/add");
  };

  return (
    <div className="transactions">
      <div className="transactions__title">Transactions</div>
      <div className="transactions__add-button">
        <CommonButton onClick={onAddTransaction}> Add transaction</CommonButton>
      </div>

      <div className="transactions__table-container">
        <Table
          columns={columns}
          data={transactions}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </div>
    </div>
  );
}
