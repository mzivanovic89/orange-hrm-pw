import { type Locator, type Page } from '@playwright/test';

export default class NavigationMenu {
  readonly page: Page;

  readonly adminLink: Locator;
  readonly pimLink: Locator;
  readonly recruitmentLink: Locator;
  readonly myInfoLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.adminLink = this.page
      .getByRole('link', { name: 'Admin' })
      .describe('Navigation menu: Admin link');
    this.pimLink = this.page
      .getByRole('link', { name: 'PIM' })
      .describe('Navigation menu: PIM link');
    this.recruitmentLink = this.page
      .getByRole('link', { name: 'Recruitment', exact: true })
      .describe('Navigation menu: Recruitment link');
    this.myInfoLink = this.page
      .getByRole('link', { name: 'My Info' })
      .describe('Navigation menu: My info link');
  }
}
