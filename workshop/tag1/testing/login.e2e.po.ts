import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

test.describe('Login Form', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with correct credentials', async ({
    page,
  }) => {
    await loginPage.fillUsername('admin');
    await loginPage.fillPassword('test');
    await loginPage.submit();
    await expect(page).toHaveURL('http://localhost:3000/list');
  });

  test('should show error message with incorrect credentials', async ({
    page,
  }) => {
    await loginPage.fillUsername('wronguser');
    await loginPage.fillPassword('wrongpass');
    await loginPage.submit();
    await loginPage.expectAlert();
  });
});
