
import { LessonsList } from '@/_core/components/site/lessons-list/lessons-list';
import { Lesson } from '@/_core/models/lesson/lesson.model';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontendly',
}

export default async function SiteMain() {
  try {
    const response = await fetch(process.env.URL + '/api/tutorial/lessons');
    const lessons: Lesson[] = await response.json();
    console.log(lessons, 'lessons');
    return (
      <main>
        <LessonsList lessons={lessons} />
      </main>
    );
  } catch (e: any) {
    return (
      <main>
        <span>Error</span>
        <span>{e.message}</span>
      </main>
    )
  }
}
