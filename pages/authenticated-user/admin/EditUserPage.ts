import { type Locator, type Page } from '@playwright/test';
import { test } from 'base/test';
import { User } from 'types/entities/User';

export default class EditUserPage {
  readonly page: Page;

  readonly userRoleSelect: Locator;
  readonly employeeNameInput: Locator;
  readonly statusSelect: Locator;
  readonly usernameInput: Locator;

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

    this.saveButton = this.page
      .getByRole('button', { name: 'Save' })
      .describe('Save button');
  }

  async editUser(data?: Partial<User>) {
    test.step('Edit user page: Edit user', async () => {
      if (
        data?.userRole &&
        data.userRole !== (await this.userRoleSelect.innerText())
      ) {
        await this.userRoleSelect.click();
        await this.page.getByRole('listbox').getByText(data.userRole).click();
      }
      if (
        data?.employeeName &&
        data.employeeName !== (await this.employeeNameInput.innerText())
      ) {
        await this.employeeNameInput.fill(data.employeeName);

        // We get 'Invalid' error if we do not click on the drop-down list
        await this.page
          .getByRole('listbox')
          .getByText(data.employeeName)
          .click();
      }
      if (
        data?.status &&
        data.status !== (await this.statusSelect.innerText())
      ) {
        await this.statusSelect.click();
        await this.page.getByRole('listbox').getByText(data.status).click();
      }
      if (
        data?.username &&
        data.userRole !== (await this.usernameInput.innerText())
      ) {
        await this.usernameInput.fill(data.username);
      }

      await this.saveButton.click();
    });
  }
}
