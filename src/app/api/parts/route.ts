import prisma from "@lib/prisma";
import { Part } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const parts: Part[] = await prisma.part.findMany({
      where: {
        lessonId: parseInt(body.lessonId, 10),
      }
    });

    const part = await prisma.part.create({
      data: {
        name: body.name,
        order: parts.length ? partWithHighestOrder(parts).order + 1 : 1,
        lesson: { connect: { id: parseInt(body.lessonId, 10), } }
      }
    });

    return Response.json(part, { status: 201 });
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}

function partWithHighestOrder(parts: Part[]): Part {
  return parts.reduce((acc, cur) => {
    return cur.order > acc.order ? cur : acc;
  }, parts[0]);
}