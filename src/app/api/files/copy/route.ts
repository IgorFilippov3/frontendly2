import prisma from "@lib/prisma";
import { File, Part } from "@prisma/client";

export async function POST(req: Request) {
  // partId and order belongs to the part to which we want create new files
  const { lessonId, partId, order } = await req.json();

  try {
    const part: Part & { files: any[] } | null = await prisma.part.findFirst({
      where: {
        lessonId: parseInt(lessonId),
        order: parseInt(order) - 1
      },
      include: {
        files: true,
      }
    });

    if (part === null) {
      return Response.json('Part not found', { status: 404 });
    }

    const duplicateFiles: File[] = [];

    for (let { name, path, type, code } of part.files) {
      const file = await prisma.file.create({
        data: {
          name,
          path,
          type,
          code,
          part: { connect: { id: parseInt(partId) } }
        },
      });

      duplicateFiles.push(file);
    }

    return Response.json(duplicateFiles);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}