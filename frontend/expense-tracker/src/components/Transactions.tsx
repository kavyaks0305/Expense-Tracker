import { useEffect, useRef, useState } from "react";
import { addTransaction, getTransactions } from "../api/transactions";
import Table from "./table/Table";

import "./Transactions.scss";

import BasicCard from "./card/TransactionCard";

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
];

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

      setHasMore(response.items.length === 20);
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
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    const scrollPoint = scrollElement?.scrollTop + scrollElement.offsetHeight;

    const isBottomOfWindow =
      Math.round(scrollPoint) >= scrollElement.scrollHeight;

    if (isBottomOfWindow) {
      getlist(page);
    }
  };

  return (
    <div className="table-container">
      <div className="cards" onScroll={loadMore} ref={parentRef}>
        <Table
          columns={columns}
          data={transactions}
          pageSize={20}
          rowHeight={42}
          selectable
          sortable
          virtualized
          infiniteScroll
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />  
      </div>
      {/*  */}
    </div>
  );
}
