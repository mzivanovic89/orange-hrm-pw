import { faker } from '@faker-js/faker';
import {
  loginValidationScenarios,
  validLoginScenarios,
} from 'assets/test-data/auth/login-scenarios';
import { test, expect } from 'base/test';
import LoginPage from 'pages/auth/LoginPage';
import DashboardPage from 'pages/authenticated-user/DashboardPage';
import { Tag } from 'types/project/Tag';

test.describe('Login tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test(
    'Guest is redirected to login page',
    { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH] },
    async ({ page }) => {
      await expect(page).toHaveURL(LoginPage.URL);
    }
  );

  test.describe('Login with valid admin credentials', () => {
    for (const scenario of validLoginScenarios) {
      test(scenario.name, { tag: scenario.tags }, async ({ pages, page }) => {
        await pages.loginPage().login({
          username: scenario.username,
          password: scenario.password,
        });

        await expect
          .soft(pages.dashboardPage().headingLabel)
          .toHaveText('Dashboard');
        await expect.soft(page).toHaveURL(DashboardPage.URL);
      });
    }
  });

  test(
    'Logged in user is redirected to dashboard when visiting base url',
    { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH] },
    async ({ pages, page }) => {
      await pages.loginPage().login({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      });

      await page.goto('/');

      await expect
        .soft(pages.dashboardPage().headingLabel)
        .toHaveText(DashboardPage.HEADING_TEXT);
      await expect.soft(page).toHaveURL(DashboardPage.URL);
    }
  );

  test.describe('Form validation scenarios', () => {
    test(
      'Login with blank username and random password',
      { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH] },
      async ({ pages }) => {
        await pages.loginPage().login({
          username: '',
          password: faker.string.alphanumeric({ length: 8 }),
        });

        await expect
          .soft(pages.loginPage().usernameError)
          .toHaveText(LoginPage.USERNAME_REQUIRED_ERROR_TEXT);
        await expect.soft(pages.loginPage().passwordError).not.toBeVisible();
      }
    );

    test(
      'Login with blank password and random username',
      { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH] },
      async ({ pages }) => {
        await pages.loginPage().login({
          username: faker.string.alphanumeric({ length: 8 }),
          password: '',
        });

        await expect
          .soft(pages.loginPage().passwordError)
          .toHaveText(LoginPage.PASSWORD_REQUIRED_ERROR_TEXT);
        await expect.soft(pages.loginPage().usernameError).not.toBeVisible();
      }
    );

    test(
      'Login with blank username and password',
      { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH] },
      async ({ pages }) => {
        await pages.loginPage().login({
          username: '',
          password: '',
        });

        await expect
          .soft(pages.loginPage().usernameError)
          .toHaveText(LoginPage.USERNAME_REQUIRED_ERROR_TEXT);
        await expect
          .soft(pages.loginPage().passwordError)
          .toHaveText(LoginPage.PASSWORD_REQUIRED_ERROR_TEXT);
      }
    );
  });

  test.describe('Login validation scenarios', () => {
    for (const scenario of loginValidationScenarios) {
      test(scenario.name, { tag: scenario.tags }, async ({ pages }) => {
        await pages.loginPage().login({
          username: scenario.username,
          password: scenario.password,
        });

        await expect(pages.loginPage().errorAlert).toHaveText(
          LoginPage.INVALID_CREDENTIALS_ERROR_TEXT
        );
      });
    }
  });
});
