import { test, expect } from 'base/test';
import { config } from 'project.config';
import { Tag } from 'types/enums/Tag';
import { UserRole } from 'types/enums/UserRole';
import { UserStatus } from 'types/enums/UserStatus';

test.describe('User management tests', () => {
  test.beforeEach(async ({ page, pages }) => {
    await page.goto('/');

    await pages.loginPage().login(config.adminCredentials);
  });

  test(
    'Add user',
    { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.ADMIN_USER_MANAGEMENT, Tag.SMOKE] },
    async ({ pages, actions }) => {
      const employee = await actions.createEmployee();
      const user = await actions.createUser({ employee });

      // Verify user is visible in the user table
      const tableData = await pages
        .userManagementPage()
        .extractDataFromUserTableForUser(user.username);

      expect(tableData).toEqual({
        username: user.username,
        userRole: user.userRole,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        status: user.status,
      });
    }
  );

  test(
    'Edit user',
    { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.ADMIN_USER_MANAGEMENT, Tag.SMOKE] },
    async ({ actions, pages }) => {
      const employee = await actions.createEmployee();
      const user = await actions.createUser({ employee });

      await pages.userManagementPage().clickEditUserButton(user.username);

      // Create data to update user by inverting `userRole` and `status`
      const updatedUserData = {
        userRole:
          user.userRole === UserRole.ADMIN ? UserRole.ESS : UserRole.ADMIN,
        status:
          user.status === UserStatus.ENABLED
            ? UserStatus.DISABLED
            : UserStatus.ENABLED,
      };

      await pages.editUserPage().editUser(updatedUserData);

      await pages.toast().success.waitFor();

      // Validate the table now contains updated data
      const tableData = await pages
        .userManagementPage()
        .extractDataFromUserTableForUser(user.username);

      expect(tableData).toEqual({
        username: user.username,
        userRole: updatedUserData.userRole,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        status: updatedUserData.status,
      });
    }
  );

  test(
    'Delete user',
    { tag: [Tag.ALL, Tag.FUNCTIONAL, Tag.ADMIN_USER_MANAGEMENT, Tag.SMOKE] },
    async ({ actions, pages }) => {
      const employee = await actions.createEmployee();
      const user = await actions.createUser({ employee });

      await pages.userManagementPage().clickDeleteUserButton(user.username);
      await pages.confirmDeleteModal().yesButton.click();

      // Verify the user is no longer present in user table
      const removedUserLocator = pages
        .userManagementPage()
        .getRowForUser(user.username);

      expect(await removedUserLocator.count()).toBe(0);
    }
  );
});
