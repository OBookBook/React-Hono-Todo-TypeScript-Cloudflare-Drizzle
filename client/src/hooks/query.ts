import { useQuery } from "@tanstack/react-query";

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8787/todos");
      if (!response.ok) {
        throw new Error("Network resuponse wa not ok");
      }

      return response.json();
    },
  });
};
