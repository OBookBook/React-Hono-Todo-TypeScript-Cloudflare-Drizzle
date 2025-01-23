// @Docs https://mswjs.io/docs/getting-started
import { http, HttpResponse } from "msw";
import { Todo } from "../../types/types";

let todos: Todo[] = [];
// テストごとにtodosをリセットする
beforeEach(() => {
  todos = [
    { id: "1", title: "Todo 1", status: "done", createdAt: "2025-01-01" },
    { id: "2", title: "Todo 2", status: "done", createdAt: "2025-01-02" },
  ];
});

// モックハンドラーを定義 インターセプトするURLを指定
export const handlers = [
  http.get("http://127.0.0.1:8787/todos", async () => {
    return HttpResponse.json(todos, { status: 200 });
  }),
  http.post("http://127.0.0.1:8787/todos", async (req) => {
    const todoTitle = (await req.request.json()) as { title: string };
    const newTodo = {
      id: String(todos.length + Number(1)),
      title: todoTitle.title,
      status: "done",
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);

    return HttpResponse.json(newTodo, { status: 201 });
  }),
  http.delete("http://127.0.0.1:8787/todos/:id", async (req) => {
    const id = req.params.id;
    todos = todos.filter((todo) => todo.id !== id);

    return HttpResponse.json(
      { message: "Todo with id ${id} has been deleted " },
      { status: 200 }
    );
  }),
  http.put("http://127.0.0.1:8787/todos/:id", async (req) => {
    const id = req.params.id;
    const updateInfo = (await req.request.json()) as { title: string };
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    const updatedTodo = {
      ...todos[todoIndex],
      title: updateInfo.title,
    };
    todos[todoIndex] = updatedTodo;

    return HttpResponse.json(updatedTodo, { status: 200 });
  }),
];
