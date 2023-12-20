import prisma from "@lib/prisma";
import { File, FileType } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.json();
  const name: string = body.name;
  const path: string = body.path;
  const type: FileType = body.type || FileType.html;
  const partId: number = parseInt(body.partId);

  try {
    const file: File = await prisma.file.create({
      data: {
        name,
        path,
        type,
        part: { connect: { id: partId } }
      },
    });

    return Response.json(file, { status: 201 });
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}