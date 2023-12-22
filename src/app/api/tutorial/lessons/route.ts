import prisma from "@lib/prisma";
import { Lesson } from "@prisma/client";

export async function POST() {
  try {
    const lessons: Lesson[] = await prisma.lesson.findMany({
      where: {
        published: true,
      },
      include: {
        user: {
          select: {
            name: true,
            key: true,
          }
        }
      }
    });

    return Response.json(lessons);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}