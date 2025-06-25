import { type Locator, type Page } from '@playwright/test';
import AuthenticatedUserPage from '../AuthenticatedUserPage';
import { User } from 'types/entities/User';

export default class UserManagementPage extends AuthenticatedUserPage {
  readonly addUserButton: Locator;

  readonly usersTable: Locator;

  static readonly URL = '/web/index.php/admin/viewSystemUsers';
  static readonly TABLE_ROW_SELECTOR = '.oxd-table-row';
  static readonly TABLE_CELL_SELECTOR = '.oxd-table-cell';

  constructor(page: Page) {
    super(page);

    this.addUserButton = this.page
      .getByRole('button', { name: 'Add' })
      .describe('Add user button');

    this.usersTable = this.page
      .locator('.oxd-table-body')
      .describe('Users table');
  }

  getRowForUser(username: string) {
    return this.usersTable
      .locator(UserManagementPage.TABLE_ROW_SELECTOR)
      .filter({ hasText: new RegExp(username) });
  }

  async extractDataFromUserTableForUser(username: string) {
    const tableRow = this.getRowForUser(username);

    const usernameValue = await tableRow
      .locator(UserManagementPage.TABLE_CELL_SELECTOR)
      .nth(1)
      .innerText();
    const userRole = await tableRow
      .locator(UserManagementPage.TABLE_CELL_SELECTOR)
      .nth(2)
      .innerText();
    const employeeName = await tableRow
      .locator(UserManagementPage.TABLE_CELL_SELECTOR)
      .nth(3)
      .innerText();
    const status = await tableRow
      .locator(UserManagementPage.TABLE_CELL_SELECTOR)
      .nth(4)
      .innerText();

    return {
      username: usernameValue,
      userRole,
      employeeName,
      status,
    };
  }

  async clickDeleteUserButton(username: string) {
    await this.getRowForUser(username).locator('button').nth(0).click();
  }

  async clickEditUserButton(username: string) {
    await this.getRowForUser(username).locator('button').nth(1).click();
  }
}
