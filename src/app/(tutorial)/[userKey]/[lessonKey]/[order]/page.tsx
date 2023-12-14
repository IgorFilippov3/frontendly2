import { LessonPart } from "@/_core/components/part/part";
import { LessonPartData } from "@/_core/models/lesson/lesson-part-data.model";
import { Lesson } from "@/_core/models/lesson/lesson.model";

interface PartPageProps {
  params: {
    userKey: string;
    lessonKey: string;
    order: string;
  }
}

export async function generateMetadata({ params }: PartPageProps) {
  const response = await fetch(process.env.URL + '/api/tutorial/' + params.lessonKey);
  const lesson: Lesson = await response.json();

  return {
    title: `${lesson.name}`
  }
}

export default async function PartPage({ params }: PartPageProps) {
  const { userKey, lessonKey, order } = params;

  try {
    const res = await fetch(process.env.URL + `/api/tutorial`, {
      method: 'POST',
      body: JSON.stringify({ lessonKey, partOrder: order }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data: LessonPartData = await res.json();

    return <LessonPart data={data} />;

  } catch (e: any) {
    return <span>{e.message}</span>
  }
}