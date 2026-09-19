import { useEffect, useRef, useState } from "react";
import { addTransaction, getTransactions } from "../api/transactions";
import Table from "./table/Table";

import "./Dashboard.scss";

import BasicCard from "./card/TransactionCard";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);

  const getlist = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const response = await getTransactions({
        pageSize: 12,
        page: pageNumber,
      });

      setTransactions(response.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getlist(1);
  }, []);

  return (
    <div className="">
      <div className="charts">add charts here</div>
      <div className="recent-transactions-container">
        <h2>Recent transactions</h2>
        <div className="recent-transactions">
          {transactions.map((t) => {
            return (
              <div className="card">
                <BasicCard />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
