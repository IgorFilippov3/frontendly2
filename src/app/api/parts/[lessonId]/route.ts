import prisma from "@lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const parts = await prisma.part.findMany({
      where: {
        lessonId: parseInt(params.lessonId),
      }
    })

    return Response.json(parts);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}