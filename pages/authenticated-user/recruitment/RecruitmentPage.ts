import { type Locator, type Page } from '@playwright/test';

export default class RecruitmentPage {
  readonly page: Page;

  readonly vacanciesLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.vacanciesLink = this.page
      .getByRole('link', { name: 'Vacancies' })
      .describe('Vacancies link');
  }
}
