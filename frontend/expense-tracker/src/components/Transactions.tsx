import { useState } from "react";
import { addTransaction, getTransactions } from "../api/transactions";
import Table from "./table/Table";

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

  const getlist = async () => {
    try {
      const a = await getTransactions({});

      console.log(a);

      // setTransactions()
    } catch (e) {
      console.log(e);
    }
  };

  const add = () => {
    // transactions.forEach((item) => {
    //   const payload = {
    //     date: item.date,
    //     type: item.type,
    //     name: item.name,
    //     note: item.remarks,
    //     amount: item.amount,
    //     paymentMethod: item.paymentMethod,
    //     category: item.category,
    //   };
    //   addTransaction(payload);
    // });
  };

  return (
    <div className="table-contanier">
      <button onClick={getlist}>Add</button>
      <Table
        columns={columns}
        data={transactions}
        pageSize={20}
        rowHeight={42}
        selectable
        sortable
        virtualized
        infiniteScroll
      />
    </div>
  );
}
