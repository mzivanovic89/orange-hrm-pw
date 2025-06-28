/**
 * Enum representing tags used to categorize test cases. These are used for
 * filtering and grouping test cases.
 */
export enum Tag {
  // test groups
  ALL = '@all',
  FUNCTIONAL = '@functional',
  SMOKE = '@smoke',

  // sections
  AUTH = '@auth',
  ADMIN_USER_MANAGEMENT = '@admin-user-management',
  RECRUITMENT_VACANCIES = '@recruitment-vacancies',
  MY_INFO_PERSONAL_DETAILS = '@my-info',
  DASHBOARD = '@dashboard',
}
