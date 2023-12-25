import { MeLesson } from "@/_core/components/me/lesson/lesson";
import { Metadata } from 'next';

interface MeLessonPageProps {
  params: {
    lessonId: string
  }
}

export const metadata: Metadata = {
  title: 'Me | Lesson',
}

export default async function MeLessonPage({ params }: MeLessonPageProps) {
  return (
    <>
      <MeLesson lessonId={params.lessonId} />
    </>
  );
}