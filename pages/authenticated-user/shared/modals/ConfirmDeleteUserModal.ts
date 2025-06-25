import { type Locator, type Page } from '@playwright/test';

export default class ConfirmDeleteUserModal {
  readonly page: Page;

  readonly yesButton: Locator;
  readonly noButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.yesButton = this.page
      .getByRole('button', { name: 'Yes, Delete' })
      .describe('Confirm delete button');
    this.noButton = this.page
      .getByRole('button', { name: 'No, Cancel' })
      .describe('Cancel delete button');
  }
}
