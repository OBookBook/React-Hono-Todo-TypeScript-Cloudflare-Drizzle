import TodoApp from "../../components/TodoApp";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const renderWithQueryClient = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("TodoAppコンポーネントのテストケース", () => {
  test("データフェッチ中のローディング状態が表示される", () => {
    renderWithQueryClient(<TodoApp />);
    screen.debug();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
