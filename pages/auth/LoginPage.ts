import { type Locator, type Page } from '@playwright/test';
import { test } from 'base/test';

export default class LoginPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly usernameError: Locator;
  readonly passwordInput: Locator;
  readonly passwordError: Locator;

  readonly loginButton: Locator;

  readonly errorAlert: Locator;

  static readonly URL = '/web/index.php/auth/login';

  static readonly USERNAME_REQUIRED_ERROR_TEXT = 'Required';
  static readonly PASSWORD_REQUIRED_ERROR_TEXT = 'Required';
  static readonly INVALID_CREDENTIALS_ERROR_TEXT = 'Invalid credentials';

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = this.page
      .getByPlaceholder('Username')
      .describe('Username input field');
    this.usernameError = this.page.locator(
      'div:has(input[placeholder="Username"]) > span.oxd-input-field-error-message'
    );
    this.passwordInput = this.page
      .getByPlaceholder('Password')
      .describe('Password input field');
    this.passwordError = this.page.locator(
      'div:has(input[placeholder="Password"]) > span.oxd-input-field-error-message'
    );

    this.loginButton = this.page
      .getByRole('button', { name: 'Login' })
      .describe('Login button');

    this.errorAlert = this.page.getByRole('alert');
  }

  async login(data?: { username?: string; password?: string }) {
    await test.step('Login page: Login', async () => {
      if (data?.username) {
        await this.usernameInput.fill(data.username);
      }
      if (data?.password) {
        await this.passwordInput.fill(data.password);
      }

      await this.loginButton.click();
    });
  }
}
