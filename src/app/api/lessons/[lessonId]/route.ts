import { getQueryParameter } from "@/_core/utils/get-query-param";
import { options } from "@lib/auth";
import prisma from "@lib/prisma";
import { Lesson } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { makeFindArgs } from "./utils";

export async function PUT(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const body = await req.json();
    const lesson = await prisma.lesson.update({
      where: {
        id: parseInt(params.lessonId)
      },
      data: body,
    });

    return Response.json(lesson);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  const session: Session | null = await getServerSession(options);
  if (!session) {
    return Response.json('Forbidden', { status: 403 });
  }

  const relation: string | null = getQueryParameter(req.url, 'relation');

  const findArgs: any = makeFindArgs({
    lessonId: params.lessonId,
    session: session,
    relation: relation
  });

  try {
    const lesson: Lesson | null = await prisma.lesson.findFirst(findArgs);

    if (!lesson) {
      return Response.json('Not found', { status: 404 });
    }

    return Response.json(lesson);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}