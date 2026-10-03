export const PAYMENT_METHOD = {
  cash: "Cash",
  bankTransfer: "Bank transfer",
  creditCard: "Credit card",
  debitCard: "Debit card",
  upi: "UPI",
};

export const TRANASACTION_TYPE = {
  income: "Income",
  expense: "Expense",
};

export const paymentMethods = Object.entries(PAYMENT_METHOD).map(
  ([key, value]) => ({
    text: value,
    value: key,
  }),
);

export const transactionTypes = [
  { text: "Income", value: "income" },
  { text: "Expense", value: "expense" },
];
