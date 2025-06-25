import { type Locator, type Page } from '@playwright/test';
import { test } from 'base/test';
import { User } from 'types/entities/User';

export default class AddUserPage {
  readonly page: Page;

  readonly userRoleSelect: Locator;
  readonly employeeNameInput: Locator;
  readonly statusSelect: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userRoleSelect = this.page
      .locator('.oxd-select-text')
      .first()
      .describe('User role select');
    this.employeeNameInput = this.page
      .getByRole('textbox', { name: 'Type for hints...' })
      .describe('Employee name input');
    this.statusSelect = this.page
      .locator('.oxd-select-text')
      .nth(1)
      .describe('Status select');
    this.usernameInput = this.page
      .getByRole('textbox')
      .nth(2)
      .describe('Username input');
    this.passwordInput = this.page
      .getByRole('textbox')
      .nth(3)
      .describe('Password input');
    this.confirmPasswordInput = this.page
      .getByRole('textbox')
      .nth(4)
      .describe('Confirm password input');

    this.saveButton = this.page
      .getByRole('button', { name: 'Save' })
      .describe('Save button');
  }

  async addUser(data?: Partial<User>) {
    test.step('Add user page: Add user', async () => {
      if (data?.userRole) {
        await this.userRoleSelect.click();
        await this.page.getByRole('listbox').getByText(data.userRole).click();
      }
      if (data?.employeeName) {
        await this.employeeNameInput.fill(data.employeeName);

        // We get 'Invalid' error if we do not click on the drop-down list
        await this.page
          .getByRole('listbox')
          .getByText(data.employeeName)
          .click();
      }
      if (data?.status) {
        await this.statusSelect.click();
        await this.page.getByRole('listbox').getByText(data.status).click();
      }
      if (data?.username) {
        await this.usernameInput.fill(data.username);
      }
      if (data?.password) {
        await this.passwordInput.fill(data.password);
        await this.confirmPasswordInput.fill(data.password);
      }

      await this.saveButton.click();
    });
  }
}
