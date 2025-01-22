import { describe } from "vitest";
import TodoApp from "../../components/TodoApp";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const renderWithQueryClient = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("TodoApp", () => {
  test("テスト", () => {
    renderWithQueryClient(<TodoApp />);
    screen.debug();
  });
});
