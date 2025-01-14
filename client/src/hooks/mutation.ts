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
