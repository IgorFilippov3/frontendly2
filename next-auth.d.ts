import { UserRole } from '@/_core/models/user/user-role.model';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      key: string;
    } & DefaultSession['user'];
  }
}