import { type Page } from '@playwright/test';
import LoginPage from 'pages/auth/LoginPage';
import DashboardPage from 'pages/authenticated-user/DashboardPage';

export default class Pages {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  loginPage() {
    return new LoginPage(this.page);
  }

  dashboardPage() {
    return new DashboardPage(this.page);
  }
}
