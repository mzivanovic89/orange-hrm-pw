import { type Page, type Locator } from '@playwright/test';
import { test } from 'base/test';

export default class PIMPage {
  readonly page: Page;

  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;

  readonly addEmployeeButton: Locator;

  readonly deleteSelectedButton: Locator;
  readonly selectAllRowsCheckbox: Locator;
  readonly noRecordsFoundLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.employeeNameInput = this.page
      .getByRole('textbox', { name: 'Type for hints...' })
      .first()
      .describe('Employee name input');
    this.searchButton = this.page
      .getByRole('button', { name: 'Search' })
      .describe('Search button');

    this.addEmployeeButton = this.page
      .getByRole('button', { name: 'Add' })
      .describe('Add employee button');

    this.deleteSelectedButton = this.page
      .getByRole('button', { name: 'Delete Selected' })
      .describe('Delete selected button');
    this.selectAllRowsCheckbox = this.page
      .getByRole('columnheader')
      .locator('.oxd-checkbox-input')
      .describe('Select all rows checkbox');
    this.noRecordsFoundLabel = this.page
      .locator('span')
      .filter({ hasText: 'No Records Found' })
      .describe('No records found label');
  }

  async search(data?: { employeeName: string }) {
    await test.step('PIM Page: Search', async () => {
      if (data?.employeeName) {
        await this.employeeNameInput.fill(data.employeeName);
      }

      await this.searchButton.click();
    });
  }
}
