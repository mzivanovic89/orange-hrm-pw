import { expect, test } from 'base/test';
import { config } from 'project.config';
import { Vacancy } from 'types/entities/Vacancy';
import { Tag } from 'types/enums/Tag';
import StringUtils from 'util/StringUtils';
import { filterScenarios } from './vacancies-filters.scenarios';

test.describe('Vacancies filters tests', () => {
  test.beforeEach(async ({ page, pages }) => {
    await page.goto('/');

    await pages.loginPage().login(config.adminCredentials);
  });

  for (const scenario of filterScenarios) {
    test(
      scenario.name,
      { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.RECRUITMENT_VACANCIES] },
      async ({ actions, pages }) => {
        const employee = await actions.createEmployee();
        const vacancies: Vacancy[] = [];

        // Create vacancies to use for filtering
        for (let i = 0; i < 2; i++) {
          const vacancy = await actions.createVacancy({
            hiringManager: employee,
          });

          vacancies.push({
            ...vacancy,
            // Remove middle name (if present) because the results table does not display it
            hiringManager: StringUtils.removeMiddleName(vacancy.hiringManager),
          });
        }

        await pages.recruitmentPage().vacanciesLink.click();

        // If we apply filter(s) while the table is loading, filters will not be applied.
        // Because of this, we need to first wait for the result table to be displayed
        // before applying filters.
        await pages.loadingSpinner().waitForLoadToComplete();

        // Create filter object from array of filters: ['jobTitle'] => { jobTitle: vacancies[0].jobTitle }
        const vacancyFilters = scenario.filters.reduce((result, filter) => {
          result[filter] = vacancies[0][filter];
          return result;
        }, {});

        await pages.vacanciesPage().search(vacancyFilters);

        const tableResults = await pages.vacanciesPage().extractTableData();

        for (const result of tableResults) {
          expect.soft(result).toMatchObject(vacancyFilters);
        }
      }
    );
  }
});
