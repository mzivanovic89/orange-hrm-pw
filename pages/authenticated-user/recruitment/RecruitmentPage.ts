import { type Locator, type Page } from '@playwright/test';
import AuthenticatedUserPage from '../AuthenticatedUserPage';

export default class RecruitmentPage extends AuthenticatedUserPage {
  readonly vacanciesLink: Locator;

  constructor(page: Page) {
    super(page);

    this.vacanciesLink = this.page
      .getByRole('link', { name: 'Vacancies' })
      .describe('Vacancies link');
  }
}
