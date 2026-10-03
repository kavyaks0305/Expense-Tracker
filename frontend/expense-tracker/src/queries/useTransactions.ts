// queries/useTransactions.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "../api/transactions";

export const useGetTransactions = (page: number, pageSize = 100) => {
  return useQuery({
    queryKey: ["transactions", page, pageSize],
    queryFn: () =>
      getTransactions({
        page,
        limit: pageSize,
      }),
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      editTransaction(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
};
