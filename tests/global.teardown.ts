import { test } from 'base/test';
import { config } from 'project.config';

test.describe('Cleanup', () => {
  test.beforeEach(async ({ page, pages }) => {
    await page.goto('/');

    await pages.loginPage().login(config.adminCredentials);
  });

  test.only('Cleanup: Employees', async ({ pages, page }) => {
    await pages.navigationMenu().pimLink.click();

    // Wait for results to load before applying filters
    await pages.loadingSpinner().waitForLoadToComplete();

    await pages.pimPage().search({ employeeName: config.automationPrefix });

    // wait for attachments to load
    await pages.loadingSpinner().waitForLoadToComplete();

    if (await pages.pimPage().noRecordsFoundLabel.isHidden()) {
      await pages.pimPage().selectAllRowsCheckbox.check();
      await pages.pimPage().deleteSelectedButton.click();

      await pages.confirmDeleteModal().yesButton.click();
    }
  });

  test('Cleanup: Attachments', async ({ pages, page }) => {
    await pages.navigationMenu().myInfoLink.click();

    // wait for attachments to load
    await pages.loadingSpinner().waitForLoadToComplete();

    const rowsForRemoval = await page
      .getByRole('row')
      .filter({ hasText: config.automationPrefix })
      .all();

    if (rowsForRemoval.length) {
      for (const row of rowsForRemoval) {
        await row.locator('.oxd-checkbox-input').check();
      }

      await pages.pimPage().deleteSelectedButton.click();

      await pages.confirmDeleteModal().yesButton.click();
    }
  });

  test('Cleanup: Vacancies', async ({ pages, page }) => {
    await pages.navigationMenu().recruitmentLink.click();
    await pages.recruitmentPage().vacanciesLink.click();

    // wait for vacancies to load before applying filter
    await pages.loadingSpinner().waitForLoadToComplete();

    const rowsForRemoval = await page
      .getByRole('row')
      .filter({ hasText: config.automationPrefix })
      .all();

    if (rowsForRemoval.length) {
      for (const row of rowsForRemoval) {
        await row.locator('.oxd-checkbox-input').check();
      }

      await pages.vacanciesPage().deleteSelectedButton.click();

      await pages.confirmDeleteModal().yesButton.click();
    }
  });
});
