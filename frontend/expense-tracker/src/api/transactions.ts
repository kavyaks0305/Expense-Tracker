import api from "./axios";

export const addTransaction = (payload: any) => {
  api.post("/transactions", payload);
};

export const editTransaction = (id: string, payload: any) => {
  api.patch("/transactions/{id}", payload);
};

export const removeTransaction = (id: string, payload: any) => {
  api.delete("/transactions/{id}", payload);
};

export const getTransactions = (params: any) => {
  api.get("/transactions", params);
};


// gettransaction