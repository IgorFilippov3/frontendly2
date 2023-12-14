
import { LessonsList } from '@/_core/components/site/lessons-list/lessons-list';
import { Lesson } from '@/_core/models/lesson/lesson.model';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontendly',
}

export default async function SiteMain() {
  const response = await fetch(process.env.URL + '/api/tutorial/lessons');
  const lessons: Lesson[] = await response.json();

  return (
    <main>
      <LessonsList lessons={lessons} />
    </main>
  );
}
