import { MeLesson } from "@/_core/components/me/lesson/lesson";
import { Lesson } from "@/_core/models/lesson/lesson.model";

interface MeLessonPageProps {
  params: {
    lessonId: string
  }
}

export async function generateMetadata({ params }: MeLessonPageProps) {
  const response = await fetch(process.env.URL + '/api/lessons/' + params.lessonId);
  const lesson: Lesson = await response.json();

  return {
    title: `Me | Lesson: ${lesson.name}`
  }
}


export default async function MeLessonPage({ params }: MeLessonPageProps) {
  return (
    <>
      <MeLesson lessonId={params.lessonId} />
    </>
  );
}