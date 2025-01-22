// @Docs https://mswjs.io/docs/getting-started
import { http, HttpResponse } from "msw";

const todos = [
  { id: 1, title: "Todo 1", status: "done", createdAt: "2025-01-01" },
  { id: 2, title: "Todo 2", status: "done", createdAt: "2025-01-02" },
];

// モックハンドラーを定義 インターセプトするURLを指定
export const handlers = [
  http.get("http://127.0.0.1:8787/todos", async () => {
    return HttpResponse.json(todos, { status: 200 });
  }),
];
