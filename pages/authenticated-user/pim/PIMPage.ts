import { type Page, type Locator } from '@playwright/test';
import AuthenticatedUserPage from '../AuthenticatedUserPage';

export default class PIMPage extends AuthenticatedUserPage {
  readonly addEmployeeButton: Locator;

  constructor(page: Page) {
    super(page);

    this.addEmployeeButton = this.page
      .getByRole('button', { name: 'Add' })
      .describe('Add employee button');
  }
}
