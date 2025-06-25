import { type Locator, type Page } from '@playwright/test';

export default class NavigationMenu {
  readonly page: Page;

  readonly adminLink: Locator;
  readonly pimLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.adminLink = this.page
      .getByRole('link', { name: 'Admin' })
      .describe('Navigation menu: Admin link');
    this.pimLink = this.page
      .getByRole('link', { name: 'PIM' })
      .describe('Navigation menu: PIM link');
  }
}
