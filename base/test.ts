import { test as base } from '@playwright/test';
import { Actions } from 'fixtures/Actions';
import Pages from 'fixtures/Pages';

interface BaseFixtures {
  pages: Pages;
  actions: Actions;
}

export const test = base.extend<BaseFixtures>({
  /**
   * Pages fixture is used to remove the need to instantiate POMs every time we
   * want to use them. This way, they are all instantiated in one place, keeping
   * the tests clean.
   */
  pages: async ({ page }, use) => {
    await use(new Pages(page));
  },
  /**
   * Actions fixture encapsulates repeated user workflows that span across multiple
   * pages.
   */
  actions: async ({ page }, use) => {
    await use(new Actions(page));
  },
});

// Re-export `expect` so that both `test` and `expect` can be imported from this file.
// This avoids the need for separate imports from 'base/test' and '@playwright/test'.
export { expect } from '@playwright/test';
