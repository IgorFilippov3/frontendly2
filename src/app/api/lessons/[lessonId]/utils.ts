import { UserRole } from "@prisma/client";
import { Session } from "next-auth";

interface MakeFindArgsProps {
  lessonId: string;
  session: Session;
  relation: string | null;
}

export function makeFindArgs({ lessonId, session, relation }: MakeFindArgsProps): any {
  const findArgs: any = {};

  if (session.user.role === UserRole.admin) {
    findArgs.where = {
      id: parseInt(lessonId, 10),
    }
  } else {
    findArgs.where = {
      userId: parseInt(session.user.id),
      id: parseInt(lessonId, 10),
    }
  }

  if (relation !== null) {
    findArgs.include = {
      parts: {
        select: {
          id: true,
          order: true,
          name: true
        }
      }
    }
  }

  return findArgs;
}