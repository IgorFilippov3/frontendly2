import { User } from "@prisma/client";

export function excludePassword({ password, ...props }: User) {
  return props;
}