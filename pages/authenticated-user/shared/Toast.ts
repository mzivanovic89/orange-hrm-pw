import { type Locator, type Page } from '@playwright/test';

export default class Toast {
  readonly page: Page;

  readonly success: Locator;

  constructor(page: Page) {
    this.page = page;

    this.success = this.page
      .locator('.oxd-toast--success')
      .describe('Success toast');
  }
}
