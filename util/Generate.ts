import { faker } from '@faker-js/faker';
import { config } from 'project.config';
import { Employee } from 'types/entities/Employee';
import { User, UserRole, UserStatus } from 'types/entities/User';

/**
 * Utility class for generating mock data.
 */
export default class Generate {
  /**
   * Generates an Employee object with random values.
   *
   * @returns {Employee} A randomly generated employee object.
   */
  static employee(): Employee {
    return {
      firstName: faker.person.firstName(),
      middleName: `${config.automationPrefix}${faker.string.alpha(10)}`,
      lastName: faker.person.lastName(),
      employeeId: faker.string.alphanumeric({ length: 8 }),
    };
  }

  /**
   * Generates a User object based on an existing employee.
   * Ensures password meets common complexity policies by appending a number.
   *
   * @param {Employee} employee - The employee data used to associate with the user.
   * @returns {User} A randomly generated user object linked to the given employee.
   */
  static user(employee: Employee): User {
    return {
      userRole: faker.helpers.enumValue(UserRole),
      employeeName: `${employee.firstName} ${employee.middleName} ${employee.lastName}`,
      status: faker.helpers.enumValue(UserStatus),
      username: faker.internet.username(employee),
      password: `${faker.string.alphanumeric({ length: 8 })}1`, // Add `1` at the end to make sure password always fits password policy
    };
  }
}
