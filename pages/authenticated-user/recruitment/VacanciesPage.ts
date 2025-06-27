import { type Locator, type Page } from '@playwright/test';
import { test } from 'base/test';

export default class VacanciesPage {
  readonly page: Page;

  readonly jobTitleSelect: Locator;
  readonly vacancySelect: Locator;
  readonly hiringManagerSelect: Locator;
  readonly statusSelect: Locator;

  readonly searchButton: Locator;

  readonly addVacancyButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.jobTitleSelect = this.page
      .locator('.oxd-select-text')
      .nth(0)
      .describe('Job title select');
    this.vacancySelect = this.page
      .locator('.oxd-select-text')
      .nth(1)
      .describe('Vacancy select');
    this.hiringManagerSelect = this.page
      .locator('.oxd-select-text')
      .nth(2)
      .describe('Hiring manager select');
    this.statusSelect = this.page
      .locator('.oxd-select-text')
      .nth(3)
      .describe('Status select');

    this.searchButton = this.page
      .getByRole('button', { name: 'Search' })
      .describe('Search button');

    this.addVacancyButton = this.page
      .getByRole('button', { name: 'Add' })
      .describe('Add vacancy button');
  }

  async search(data?: {
    jobTitle?: string;
    vacancyName?: string;
    hiringManager?: string;
    status?: string;
  }) {
    await test.step('Vacancies page: search', async () => {
      if (data?.jobTitle) {
        await this.jobTitleSelect.click();
        await this.page.getByRole('listbox').getByText(data.jobTitle).click();
      }
      if (data?.vacancyName) {
        await this.vacancySelect.click();
        await this.page
          .getByRole('listbox')
          .getByText(data.vacancyName)
          .click();
      }
      if (data?.hiringManager) {
        await this.hiringManagerSelect.click();
        await this.page
          .getByRole('listbox')
          .getByText(data.hiringManager)
          .click();
      }
      if (data?.status) {
        await this.statusSelect.click();
        await this.page.getByRole('listbox').getByText(data.status).click();
      }

      await this.searchButton.click();
    });
  }

  async extractTableData() {
    const allRows = await this.page.getByRole('row').all();
    const rowsWithoutHeader = allRows.slice(1);

    const results = await Promise.all(
      rowsWithoutHeader.map(async (row) => {
        const rowCells = row.getByRole('cell');

        return {
          jobTitle: await rowCells.nth(2).innerText(),
          vacancyName: await rowCells.nth(1).innerText(),
          hiringManager: await rowCells.nth(3).innerText(),
          status: await rowCells.nth(4).innerText(),
        };
      })
    );

    return results;
  }
}
