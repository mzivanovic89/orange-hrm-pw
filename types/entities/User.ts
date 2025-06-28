import { UserRole } from 'types/enums/UserRole';
import { UserStatus } from 'types/enums/UserStatus';

export type User = {
  userRole: UserRole;
  employeeName: string;
  status: UserStatus;
  username: string;
  password: string;
};
