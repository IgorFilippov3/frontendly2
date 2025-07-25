import prisma from "@lib/prisma";
import { nameToKey } from "@/_core/utils/name-to-key";
import { options } from "@lib/auth";
import { UserRole } from "@prisma/client";
import { Session, getServerSession } from "next-auth";

export async function GET() {
  const session: Session | null = await getServerSession(options);
  if (!session) {
    return Response.json('Forbidden', { status: 403 });
  }

  const role: UserRole = session.user.role;

  if (role === 'admin') {
    const lessons = await prisma.lesson.findMany();
    return Response.json(lessons);
  }

  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        userId: parseInt(session.user.id),
      }
    });
    return Response.json(lessons);
  } catch (e: any) {
    return Response.json(e.message, { status: 400 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(options);
  const body = await req.json();

  let key: string = nameToKey(body.name);

  try {
    const existingLesson = await prisma.lesson.findFirst({
      where: {
        key,
      },
    });

    if (existingLesson) {
      let counter = 1;
      let newKey = key;
      
      while (counter < 50) {
        newKey = `${key}-${counter}`;
        const lessonWithNewKey = await prisma.lesson.findFirst({
          where: { key: newKey },
        });
  
        if (!lessonWithNewKey) {
          break;
        }
  
        counter++;
      }
  
      key = newKey;
    }

    const new_lesson = await prisma.lesson.create({
      data: {
        name: body.name,
        key: key,
        posterImage: body.posterImage.length ? body.posterImage : null,
        published: false,
        contentType: body.contentType,
        accessType: body.accessType,
        userId: parseInt(session!.user.id),
      },
    });

    return Response.json(new_lesson, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return Response.json(e.message, { status: 400 });
  }
}