import { UserRole } from "./user-role.model";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}