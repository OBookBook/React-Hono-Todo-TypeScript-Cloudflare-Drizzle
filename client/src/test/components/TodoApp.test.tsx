import { describe } from "vitest";
import TodoApp from "../../components/TodoApp";
import { render } from "@testing-library/react";

describe("TodoApp", () => {
  test("テスト", () => {
    render(<TodoApp />);
  });
});
