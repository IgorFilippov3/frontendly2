//@ts-ignore
import { SHA256 } from 'crypto-js';

export function hashPassword(password: string): string {
  return SHA256(password).toString();
}