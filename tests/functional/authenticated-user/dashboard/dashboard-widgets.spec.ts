import { expect, test } from 'base/test';
import DashboardPage from 'pages/authenticated-user/dashboard/DashboardPage';
import { config } from 'project.config';
import { Tag } from 'types/project/Tag';
import { scenarios } from './dashboard-widgets.scenarios';

test.describe.only('Dashboard widget tests', () => {
  for (const scenario of scenarios) {
    test(
      `Verify ${scenario.name} chart legend`,
      { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.DASHBOARD] },
      async ({ page, pages }) => {
        await page.goto('/');

        const responsePromise = page.waitForResponse(scenario.responseUrlRegex);

        await pages.loginPage().login(config.adminCredentials);

        // resolve promise and extract json data
        const response = await responsePromise;
        const responseJson = await response.json();

        // extract label names from response
        const expectedLabels = responseJson.data.map(
          (entity) => entity[scenario.entityName].name
        );

        if (responseJson.meta.unassignedEmployeeCount > 0) {
          expectedLabels.push('Unassigned');
        }

        const widgetContainer = page
          .locator(DashboardPage.WIDGET_CONTAINER_SELECTOR)
          .filter({ hasText: scenario.name });

        // wait for the chart to load
        await widgetContainer.locator('canvas').waitFor();

        // extract text from the widget
        const widgetTextRaw = await widgetContainer.innerText();

        // turn into array and remove widget title
        const actualLabels = widgetTextRaw
          .split('\n')
          .filter((text) => text !== scenario.name && text.trim());

        expect(actualLabels).toEqual(expectedLabels);
      }
    );
  }
});
