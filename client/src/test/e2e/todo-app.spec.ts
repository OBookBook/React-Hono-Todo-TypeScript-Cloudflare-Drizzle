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

  //   test("Todoの編集", async ({ page }) => {
  //     // タスクを追加する
  //     await page.fill('input[placeholder="Add a new task"]', "Edit this Task");
  //     await page.click("text=Add");
  //     await expect(page.locator("text=Edit this Task").last()).toBeVisible();
  //     // 編集ボタンをクリック
  //     await page.locator("button[aria-label='Edit']").last().click();
  //     // 編集用入力フィールドを取得して編集
  //     const editInput = page.locator('input[type="text"]').last();
  //     await editInput.fill("Edited Task");
  //     // 保存ボタンをクリック
  //     await page.locator("button", { hasText: "保存" }).last().click();
  //     // 編集後のテキストが表示されていることを確認
  //     await expect(page.locator("text=Edited Task").last()).toBeVisible();
  //   });
});
