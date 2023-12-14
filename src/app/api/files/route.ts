import prisma from "@lib/prisma";
import { File, FileType } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.json();
  const name: string = body.name;
  const type: FileType = body.type;
  const partId: number = parseInt(body.partId);

  try {
    const file: File = await prisma.file.create({
      data: {
        name, 
        type,
        part: { connect: { id: partId } }
      },
    });

    return Response.json(file, { status: 201 });
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}