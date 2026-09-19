import api from "./axios";

export const addTransaction = async (payload: any) => {
  await api.post("/transactions", payload);
};

export const editTransaction = async (id: string, payload: any) => {
  await api.patch(`/transactions/${id}`, payload);
};

export const removeTransaction = async (id: string, payload: any) => {
  await api.delete(`/transactions/${id}`, payload);
};

export const getTransactions = async (params?: any) => {
  const res = await api.get("/transactions", {
    params,
  });

  return res.data;
};
