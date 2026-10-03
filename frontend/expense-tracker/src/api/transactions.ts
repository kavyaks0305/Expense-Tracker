import api from "./axios";

export const addTransaction = async (payload: any) => {
  await api.post("/transactions", payload);
};

export const editTransaction = async (id: string, payload: any) => {
  await api.patch(`/transactions/${id}`, payload);
};

export const deleteTransaction = async (id: string) => {
  await api.delete(`/transactions/${id}`);
};

export const getTransactions = async (params?: any) => {
  const res = await api.get("/transactions", {
    params,
  });

  return res.data;
};
