import { type Locator, type Page } from '@playwright/test';
import { test } from 'base/test';

export default class LoadingSpinner {
  readonly page: Page;

  readonly spinner: Locator;

  constructor(page: Page) {
    this.page = page;

    this.spinner = this.page.locator('.oxd-loading-spinner');
  }

  async waitForLoadToComplete() {
    await test.step('Loading spinner: Wait for load to complete', async () => {
      await this.spinner.waitFor({ state: 'visible' });
      await this.spinner.waitFor({ state: 'hidden' });
    });
  }
}
