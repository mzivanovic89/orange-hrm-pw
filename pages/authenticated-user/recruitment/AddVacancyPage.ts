import { type Locator, type Page } from '@playwright/test';
import { test } from 'base/test';
import { Vacancy } from 'types/entities/Vacancy';
import { VacancyStatus } from 'types/enums/VacancyStatus';

export default class AddVacancyPage {
  readonly page: Page;

  readonly vacancyNameInput: Locator;
  readonly jobTitleSelect: Locator;
  readonly descriptionInput: Locator;
  readonly hiringManagerInput: Locator;
  readonly numberOfPositionsInput: Locator;
  readonly activeSwitch: Locator;

  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.vacancyNameInput = this.page
      .getByRole('textbox')
      .nth(1)
      .describe('Vacancy name input');
    this.jobTitleSelect = this.page
      .locator('.oxd-select-text-input')
      .describe('Job title select');
    this.descriptionInput = this.page
      .getByRole('textbox', { name: 'Type description here' })
      .describe('Description input');
    this.hiringManagerInput = this.page
      .getByRole('textbox', { name: 'Type for hints...' })
      .describe('Hiring manager input');
    this.numberOfPositionsInput = this.page
      .getByRole('textbox')
      .nth(4)
      .describe('Number of positions input');
    this.activeSwitch = this.page
      .locator('form span')
      .first()
      .describe('Active switch');

    this.saveButton = this.page
      .getByRole('button', { name: 'Save' })
      .describe('Save button');
  }

  async addVacancy(data?: Partial<Vacancy>) {
    await test.step('Add vacancy page: Add vacancy', async () => {
      if (data?.vacancyName) {
        await this.vacancyNameInput.fill(data.vacancyName);
      }
      if (data?.jobTitle) {
        await this.jobTitleSelect.click();
        await this.page.getByRole('listbox').getByText(data.jobTitle).click();
      }
      if (data?.description) {
        await this.descriptionInput.fill(data.description);
      }
      if (data?.hiringManager) {
        await this.hiringManagerInput.fill(data.hiringManager);

        // We get 'Invalid' error if we do not click on the drop-down list
        await this.page
          .getByRole('listbox')
          .getByText(data.hiringManager)
          .click();
      }
      if (data?.numberOfPositions) {
        await this.numberOfPositionsInput.fill(data.numberOfPositions);
      }
      if (data?.status === VacancyStatus.CLOSED) {
        await this.activeSwitch.click();
      }

      await this.saveButton.click();
    });
  }
}
