import { type Locator, type Page } from '@playwright/test';
import { test } from 'base/test';
import { Employee } from 'types/entities/Employee';

export default class AddEmployeePage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;

  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = this.page
      .locator('.orangehrm-firstname')
      .describe('First name input');
    this.middleNameInput = this.page
      .locator('.orangehrm-middlename')
      .describe('Middle name input');
    this.lastNameInput = this.page
      .locator('.orangehrm-lastname')
      .describe('Last name input');
    this.employeeIdInput = this.page
      .locator('div')
      .filter({ hasText: /^Employee Id$/ })
      .nth(2)
      .getByRole('textbox');

    this.saveButton = this.page
      .getByRole('button', { name: 'Save' })
      .describe('Save button');
  }

  async addEmployee(data?: Partial<Employee>) {
    await test.step('Add employee page: Add employee', async () => {
      if (data?.firstName) {
        await this.firstNameInput.fill(data.firstName);
      }
      if (data?.middleName) {
        await this.middleNameInput.fill(data.middleName);
      }
      if (data?.lastName) {
        await this.lastNameInput.fill(data.lastName);
      }
      if (data.employeeId) {
        await this.employeeIdInput.fill(data.employeeId);
      }

      await this.saveButton.click();
    });
  }
}
