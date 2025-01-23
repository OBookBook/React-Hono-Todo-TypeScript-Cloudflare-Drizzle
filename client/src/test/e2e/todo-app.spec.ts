import { test, expect } from "@playwright/test";

test.describe("Todo App", () => {
  // テストの前にページに移動する
  test.beforeEach(async ({ page }) => {
    // サーバーへの接続を最大30秒間試行
    await page.goto("http://localhost:5173", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
  });
  // タスクを追加するテスト
  test("Todoの追加", async ({ page }) => {
    await page.fill('input[placeholder="Add a new task"]', "Learn Playwright");
    await page.click("text=Add");
    await expect(page.locator("text=Learn Playwright").last()).toBeVisible();
  });
  // タスクを削除するテスト
  test("Todoの削除", async ({ page }) => {
    // タスクを追加する
    await page.fill('input[placeholder="Add a new task"]', "Delete this task");
    await page.click("text=Add");
    await expect(page.locator("text=Delete this task").last()).toBeVisible();
    // タスクを削除する
    await page.locator("button[aria-label='Delete']").last().click();
    // タスクが削除されたことを確認する
    await expect(
      page.locator("text=Delete this task").last()
    ).not.toBeVisible();
  });
});
