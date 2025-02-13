import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://path/to/your/workspace/testing/login.html');
  });

  test('should login successfully with correct credentials', async ({
    page,
  }) => {
    await page.fill('#username', 'admin');
    await page.fill('#password', 'test');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:3000/list');
  });

  test('should show error message with incorrect credentials', async ({
    page,
  }) => {
    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');
    await expect(page).toHaveDialog();
  });
});
