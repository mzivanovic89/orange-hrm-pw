export type User = {
  userRole: UserRole;
  employeeName: string;
  status: UserStatus;
  username: string;
  password: string;
};

export enum UserRole {
  ADMIN = 'Admin',
  ESS = 'ESS',
}

export enum UserStatus {
  ENABLED = 'Enabled',
  DISABLED = 'Disabled',
}
