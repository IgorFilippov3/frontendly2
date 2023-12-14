import prisma from "@lib/prisma";
import { File } from "@prisma/client";

export async function GET(
  _: Request,
  { params }: { params: { partId: string } }
) {
  try {
    const files: File[] = await prisma.file.findMany({
      where: {
        partId: parseInt(params.partId),
      }
    });

    return Response.json(files);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}