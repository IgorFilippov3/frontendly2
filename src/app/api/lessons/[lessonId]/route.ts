import { getQueryParameter } from "@/_core/utils/get-query-param";
import prisma from "@lib/prisma";

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
  const relation: string | null = getQueryParameter(req.url, 'relation');

  const findArgs: any = {
    where: {
      id: parseInt(params.lessonId, 10),
    }
  };

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

  try {
    const lesson = await prisma.lesson.findFirst(findArgs);
    return Response.json(lesson);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}