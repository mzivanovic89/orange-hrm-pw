import { type Locator, type Page } from '@playwright/test';

export default abstract class AuthenticatedUserPage {
  readonly page: Page;

  readonly headingLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.headingLabel = this.page.locator('h6');
  }
}
