import { test, expect } from "@playwright/test";

test.describe("Todo App", () => {
  // テストの前にページに移動する
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });
  // タスクを追加するテスト
  test("should display the todo app", async ({ page }) => {
    await page.fill('input[placeholder="Add a new task"]', "Learn Playwright");
    await page.click("text=Add");
    await expect(page.locator("text=Learn Playwright").last()).toBeVisible();
  });
});
