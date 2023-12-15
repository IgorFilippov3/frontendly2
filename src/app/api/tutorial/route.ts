import prisma from "@lib/prisma";
import { File, Lesson, Part } from "@prisma/client";

export async function POST(req: Request) {
  const { lessonKey, partOrder } = await req.json();

  try {
    const lesson: Lesson | null = await prisma.lesson.findFirst({
      where: { key: lessonKey },
      include: {
        parts: {
          orderBy: {
            order: 'asc'
          },
          select: {
            id: true,
            order: true,
            name: true,
          }
        }
      }
    });

    if (!lesson) {
      return Response.json({ message: `Lesson with key ${lessonKey} not found` }, { status: 404 });
    }

    const part: Part | null = await prisma.part.findFirst({
      where: {
        order: parseInt(partOrder),
        lessonId: lesson.id,
      }
    });

    if (!part) {
      return Response.json({ message: `Part with order ${partOrder} not found` }, { status: 404 });
    }

    const files: File[] = await prisma.file.findMany({
      where: {
        partId: part.id,
      }
    });

    return Response.json({ lesson, part, files });
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}