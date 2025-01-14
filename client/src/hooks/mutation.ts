import { Todo } from "../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodo: Todo) => {
      return await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // Updating the cache
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // Updating the cache
    },
  });
};
