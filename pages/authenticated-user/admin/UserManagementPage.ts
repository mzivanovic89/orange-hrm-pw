import { type Locator, type Page } from '@playwright/test';
import { test } from 'base/test';

export default class UserManagementPage {
  readonly page: Page;

  readonly addUserButton: Locator;

  readonly usersTable: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addUserButton = this.page
      .getByRole('button', { name: 'Add' })
      .describe('Add user button');

    this.usersTable = this.page
      .locator('.oxd-table-body')
      .describe('Users table');
  }

  getRowForUser(username: string) {
    return this.usersTable
      .getByRole('row')
      .filter({ hasText: new RegExp(username) });
  }

  async extractDataFromUserTableForUser(username: string) {
    const tableCells = this.getRowForUser(username).getByRole('cell');

    const usernameValue = await tableCells.nth(1).innerText();
    const userRole = await tableCells.nth(2).innerText();
    const employeeName = await tableCells.nth(3).innerText();
    const status = await tableCells.nth(4).innerText();

    return {
      username: usernameValue,
      userRole,
      employeeName,
      status,
    };
  }

  async clickDeleteUserButton(username: string) {
    await test.step(`User management page: Click Delete button [user=${username}]`, async () => {
      await this.getRowForUser(username).locator('button').nth(0).click();
    });
  }

  async clickEditUserButton(username: string) {
    await test.step(`User management page: Click Edit button [user=${username}]`, async () => {
      await this.getRowForUser(username).locator('button').nth(1).click();
    });
  }
}
