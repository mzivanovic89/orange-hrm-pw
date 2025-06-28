import { type Page } from '@playwright/test';
import AuthenticatedUserPage from '../AuthenticatedUserPage';

export default class DashboardPage extends AuthenticatedUserPage {
  static readonly URL = '/web/index.php/dashboard/index';
  static readonly HEADING_TEXT = 'Dashboard';

  static readonly WIDGET_CONTAINER_SELECTOR =
    '.oxd-sheet.orangehrm-dashboard-widget';

  constructor(page: Page) {
    super(page);
  }
}
