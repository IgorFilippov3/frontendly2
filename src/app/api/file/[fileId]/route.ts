import prisma from "@lib/prisma";
import { File } from "@prisma/client";

export async function GET(
  _: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const file: File | null = await prisma.file.findFirst({
      where: {
        id: parseInt(params.fileId)
      }
    });

    return Response.json(file);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { fileId: string } }
) {
  const { code } = await req.json();

  try {
    const file: File = await prisma.file.update({
      where: {
        id: parseInt(params.fileId)
      },
      data: {
        code
      }
    });

    return Response.json(file);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    await prisma.file.delete({
      where: {
        id: parseInt(params.fileId)
      }
    });
    
    return Response.json({});
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}