import { type Locator, type Page } from '@playwright/test';

export default class DashboardPage {
  readonly page: Page;

  readonly headingLabel: Locator;

  static readonly URL = '/web/index.php/dashboard/index';
  static readonly HEADING_TEXT = 'Dashboard';

  static readonly WIDGET_CONTAINER_SELECTOR =
    '.oxd-sheet.orangehrm-dashboard-widget';

  constructor(page: Page) {
    this.page = page;

    this.headingLabel = this.page
      .locator('h6')
      .first()
      .describe('Page heading');
  }
}
