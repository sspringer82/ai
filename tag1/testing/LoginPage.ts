import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly submitButton = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('file://path/to/your/workspace/testing/login.html');
  }

  async fillUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async submit() {
    await this.page.click(this.submitButton);
  }

  async expectAlert() {
    await this.page.waitForEvent('dialog');
  }
}
