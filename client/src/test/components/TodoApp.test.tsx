import TodoApp from "../../components/TodoApp";
import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
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

  test("Todoアプリが正常に表示される", async () => {
    renderWithQueryClient(<TodoApp />);
    expect(await screen.findByText(/Todo App/i)).toBeInTheDocument(); // 非同期処理のため、findByTextを使用
    expect(await screen.findByText(/Add/i)).toBeInTheDocument(); // ボタンのテキストが"Add"であることを確認
    expect(
      await screen.findByPlaceholderText("Add a new task")
    ).toBeInTheDocument(); // 入力フォームのプレースホルダーが"Add a new task"であることを確認
    expect(
      await screen.findByRole("button", { name: "Add" })
    ).toBeInTheDocument(); // ボタンのテキストが"Add"であることを確認
  });

  test("Todo一覧が正常に表示されること", async () => {
    renderWithQueryClient(<TodoApp />);
    expect(await screen.findByText("Todo 1")).toBeInTheDocument();
    expect(await screen.findByText("Todo 2")).toBeInTheDocument();
    expect(
      (await screen.findAllByRole("button", { name: "Edit" })).length
    ).toBeGreaterThan(0); // Editボタンが1つ以上存在することを確認
    expect(
      (await screen.findAllByRole("button", { name: "Delete" })).length
    ).toBeGreaterThan(0); // Deleteボタンが1つ以上存在することを確認
  });

  test("Todoを追加する", async () => {
    renderWithQueryClient(<TodoApp />);
    const input = await screen.findByPlaceholderText("Add a new task");
    await userEvent.type(input, "New Todo");
    const addButton = await screen.findByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    expect(await screen.findByText("New Todo")).toBeInTheDocument();
  });
});
