import { Role } from '../../../functions/src/auth/role';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  role: Role;
  creationTime: string;
  lastSignInTime: string;
}
