import prisma from "@lib/prisma";
import { Lesson } from "@prisma/client";

export async function GET(
  _: Request,
  { params }: { params: { lessonKey: string } }
) { 
  try {
    const lesson: Lesson | null = await prisma.lesson.findFirst({
      where: {
        key: params.lessonKey
      }
    });

    if (!lesson) {
      return Response.json({ message: `Lesson with key ${params.lessonKey} not found` }, { status: 404 });
    }

    return Response.json(lesson);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}