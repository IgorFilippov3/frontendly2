import { getQueryParameter } from "@/_core/utils/get-query-param";
import markdownToHtml from "@/_core/utils/markdownToHtml";
import prisma from "@lib/prisma";
import { Part } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { options } from "@lib/auth";
import { UserRole } from "@/_core/models/user/user-role.model";

export async function GET(_: Request, { params }: { params: { partId: string } }) {
  const session: Session | null = await getServerSession(options);

  if (!session) {
    return Response.json('Forbidden', { status: 403 });
  }

  if (session.user.role === UserRole.admin) {
    try {
      const part: Part | null = await prisma.part.findFirst({
        where: {
          id: parseInt(params.partId, 10),
        },
        include: {
          files: {
            select: {
              id: true,
              name: true,
              type: true,
            }
          }
        }
      });

      if (!part) {
        return Response.json('Not found', { status: 404 });
      }

      return Response.json(part);
    } catch (e: any) {
      return Response.json(e.message, { status: 400 });
    }
  }

  if (session.user.role === UserRole.user) {
    try {
      const part: Part | null = await prisma.part.findFirst({
        where: {
          id: parseInt(params.partId, 10),
        },
        include: {
          files: {
            select: {
              id: true,
              name: true,
              type: true,
            }
          }
        }
      });

      if (!part) {
        return Response.json('Not found', { status: 404 });
      }

      const lesson = await prisma.lesson.findFirst({
        where: {
          id: part.lessonId!
        }
      });

      if (!lesson) {
        return Response.json('Not found', { status: 404 });
      }

      return Response.json(part);
    } catch (e: any) {
      return Response.json(e.message, { status: 400 });
    }
  }

  return Response.json('Bad request', { status: 400 });
}

export async function PUT(
  req: Request,
  { params }: { params: { partId: string } }
) {
  const body = await req.json();
  const taskMarkdown: string = body.task;
  const taskHtml = await markdownToHtml(taskMarkdown);

  try {
    const part: Part = await prisma.part.update({
      where: {
        id: parseInt(params.partId, 10)
      },
      data: {
        taskHtml,
        taskMarkdown
      }
    });

    return Response.json(part);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { partId: string } }
) {
  const session: Session | null = await getServerSession(options);

  if (!session) {
    return Response.json('Forbidden', { status: 403 });
  }

  try {
    await prisma.part.delete({
      where: {
        id: parseInt(params.partId)
      }
    });

    return Response.json({});
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}