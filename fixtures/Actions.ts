import { type Page } from '@playwright/test';
import { test } from 'base/test';
import Generate from 'util/Generate';
import Pages from './Pages';
import { type Employee } from 'types/entities/Employee';
import { type User } from 'types/entities/User';
import { Vacancy } from 'types/entities/Vacancy';

export class Actions {
  readonly page: Page;
  readonly pages: Pages;

  constructor(page: Page) {
    this.page = page;
    this.pages = new Pages(page);
  }

  /**
   * Creates a new employee by navigating through the PIM section.
   * Uses randomized data unless overridden with partial input.
   *
   * @param {Object} [args] - Optional arguments for employee creation.
   * @param {Partial<Employee>} [args.data] - Custom data to override the generated employee data.
   * @param {Object} [args.options] - Optional configuration.
   * @param {boolean} [args.options.waitForSuccessToast=true] - Whether to wait for the success toast notification.
   * @returns {Promise<Employee>} A promise that resolves to the created employee object.
   */
  async createEmployee(args?: {
    data?: Partial<Employee>;
    options?: { waitForSuccessToast?: boolean };
  }): Promise<Employee> {
    const employee = { ...Generate.employee(), ...args?.data };
    console.log('employee:', employee);

    const waitForToast = args?.options?.waitForSuccessToast ?? true;

    await test.step('Action: Create employee', async () => {
      await this.pages.navigationMenu().pimLink.click();
      await this.pages.pimPage().addEmployeeButton.click();

      await this.pages.addEmployeePage().addEmployee(employee);

      if (waitForToast) {
        await this.pages.toast().success.waitFor();
      }
    });

    return employee;
  }

  /**
   * Creates a new user for the given employee by navigating through the Admin section.
   *
   * @param {Object} args - Arguments for user creation.
   * @param {Employee} args.employee - The employee to associate with the new user.
   * @param {Partial<User>} [args.data] - Custom data to override the generated user data.
   * @param {Object} [args.options] - Optional configuration.
   * @param {boolean} [args.options.waitForSuccessToast=true] - Whether to wait for the success toast notification.
   * @returns {Promise<User>} A promise that resolves to the created user object.
   */
  async createUser(args: {
    employee: Employee;
    data?: Partial<User>;
    options?: { waitForSuccessToast?: boolean };
  }): Promise<User> {
    const user = { ...Generate.user(args.employee), ...args?.data };
    console.log('user:', user);

    const waitForToast = args?.options?.waitForSuccessToast ?? true;

    await test.step('Action: Create user', async () => {
      await this.pages.navigationMenu().adminLink.click();
      await this.pages.userManagementPage().addUserButton.click();

      await this.pages.addUserPage().addUser(user);

      if (waitForToast) {
        await this.pages.toast().success.waitFor();
      }
    });

    return user;
  }

  /**
   * Adds a personal attachment through the My Info section.
   *
   * @param {Object} args - Arguments for the attachment.
   * @param {Object} [args.data] - The attachment data.
   * @param {string} [args.data.file] - Path to the file to attach.
   * @param {string} [args.data.comment] - Optional comment for the attachment.
   * @param {Object} [args.options] - Optional configuration.
   * @param {boolean} [args.options.waitForSuccessToast=true] - Whether to wait for the success toast notification.
   * @returns {Promise<void>} A promise that resolves when the attachment is added.
   */
  async addPersonalAttachment(args: {
    data?: {
      file?: string;
      comment?: string;
    };
    options?: { waitForSuccessToast?: boolean };
  }): Promise<void> {
    const waitForToast = args?.options?.waitForSuccessToast ?? true;

    await test.step('Action: Add personal attachment', async () => {
      await this.pages.navigationMenu().myInfoLink.click();

      await this.pages.personalDetailsPage().addAttachment({
        file: args.data?.file,
        comment: args.data?.comment,
      });

      if (waitForToast) {
        await this.pages.toast().success.waitFor();
      }
    });
  }

  /**
   * Creates a new job vacancy by navigating through the Recruitment section.
   *
   * @param {Object} args - Arguments for vacancy creation.
   * @param {Employee} args.hiringManager - The employee assigned as the hiring manager.
   * @param {Partial<Vacancy>} [args.data] - Custom data to override the generated vacancy data.
   * @returns {Promise<Vacancy>} A promise that resolves to the created vacancy object.
   */
  async createVacancy(args: {
    hiringManager: Employee;
    data?: Partial<Vacancy>;
  }): Promise<Vacancy> {
    const vacancy = { ...Generate.vacancy(args.hiringManager), ...args?.data };
    console.log('vacancy:', vacancy);

    await test.step('Action: Create vacancy', async () => {
      await this.pages.navigationMenu().recruitmentLink.click();
      await this.pages.recruitmentPage().vacanciesLink.click();
      await this.pages.vacanciesPage().addVacancyButton.click();

      await this.pages.addVacancyPage().addVacancy(vacancy);

      await this.page.waitForURL('**\/addJobVacancy\/*');
    });

    return vacancy;
  }
}
