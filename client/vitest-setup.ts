import "@testing-library/jest-dom/vitest";
import { APIServer } from "./src/test/mocks/server";
import { afterAll, afterEach, beforeAll } from "vitest";

// テストケースが実行される前に実行される
beforeAll(() => {
  APIServer.listen();
});

// 各テストケースが終了した後に実行される
afterEach(() => {
  APIServer.resetHandlers();
});

// テストケースがすべて終了した後に実行される
afterAll(() => {
  APIServer.close();
});
