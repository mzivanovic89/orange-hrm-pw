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
  MY_INFO = '@my-info',
}
