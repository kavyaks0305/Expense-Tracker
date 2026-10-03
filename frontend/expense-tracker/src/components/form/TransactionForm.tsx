import { TextField, Select, MenuItem } from "@mui/material";
import "./TransactionForm.scss";
import { useState } from "react";

import SingleSelector from "../common/SingleSelector";
import { PaymentMethod, TransactionType } from "../../types/transations";
import {
  PAYMENT_METHOD,
  paymentMethods,
  TRANASACTION_TYPE,
  transactionTypes,
} from "./constants";

import Button from "../../components/common/Button";
import { addTransaction } from "../../api/transactions";

function TransactionForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState({ text: "Cash", value: "cash" });
  const [type, setType] = useState({ text: "Expense", value: "expense" });
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const onPaymentMethodChange = (value: PaymentMethod) => {
    const selectedmethod = { text: PAYMENT_METHOD[value], value };
    setMethod(selectedmethod);
  };

  const onTransactionTypeChange = (value: TransactionType) => {
    setType({
      text: TRANASACTION_TYPE[value],
      value,
    });
  };

  const onSave = async () => {
    const payload = {
      name,
      type: type.value,
      paymentMethod: method.value,
      amount,
      category,
      date,
      note,
    };

    try {
      await addTransaction(payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="transaction-form">
      <form action="">
        <div className="form-field">
          <div className="form-field--label"> Name</div>
          <TextField
            id="outlined-size-small"
            value={name}
            size="small"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <div className="form-field--label"> Payment Method</div>

          <SingleSelector
            items={paymentMethods}
            selectedItem={method}
            onSelection={onPaymentMethodChange}
          />
        </div>

        <div className="form-field">
          <div className="form-field--label"> Type</div>
          <SingleSelector
            items={transactionTypes}
            selectedItem={type}
            onSelection={onTransactionTypeChange}
          />
        </div>

        <div className="form-field">
          <div className="form-field--label"> Amount</div>
          <TextField
            id="outlined-size-small"
            value={amount}
            size="small"
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="form-field">
          <div className="form-field--label"> Category</div>
          <TextField
            id="outlined-size-small"
            value={category}
            size="small"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-field">
          <div className="form-field--label"> Date</div>
          <TextField
            type="date"
            value={date}
            id="outlined-size-small"
            size="small"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <div className="form-field--label"> Note</div>
          <TextField
            id="outlined-size-small"
            value={note}
            size="small"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="transactions__add-button">
          <Button onClick={onSave}> Save </Button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
