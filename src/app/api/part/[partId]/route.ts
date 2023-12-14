import { getQueryParameter } from "@/_core/utils/get-query-param";
import markdownToHtml from "@/_core/utils/markdownToHtml";
import prisma from "@lib/prisma";
import { Part } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { partId: string } }
) {
  const relation: string | null = getQueryParameter(req.url, 'relation');

  const findArgs: any = {
    where: {
      id: parseInt(params.partId, 10)
    }
  }

  if (relation !== null) {
    findArgs.include = {
      files: {
        select: {
          id: true,
          name: true,
          type: true,
        }
      }
    }
  }

  try {
    const part: Part | null = await prisma.part.findFirst(findArgs);
    return Response.json(part);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { partId: string } }
) {
  const body = await req.json();
  const taskMarkdown: string = body.task;
  const taskHtml = await markdownToHtml(taskMarkdown);

  try {
    const part: Part = await prisma.part.update({
      where: {
        id: parseInt(params.partId, 10)
      },
      data: {
        taskHtml,
        taskMarkdown
      }
    });

    return Response.json(part);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}