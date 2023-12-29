
import { GENERAL_SEO_INFO, OPEN_GRAPH, TWITTER } from '@/_core/catalogs/seo';
import { LessonsList } from '@/_core/components/site/lessons-list/lessons-list';
import { Lesson } from '@/_core/models/lesson/lesson.model';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  ...GENERAL_SEO_INFO,
  openGraph: OPEN_GRAPH,
  twitter: TWITTER
}

export default async function SiteMain() {
  const response = await fetch(process.env.URL + '/api/tutorial/lessons', {
    method: 'POST',
    cache: 'no-store',
  });
  const lessons: Lesson[] = await response.json();

  return (
    <main>
      <LessonsList lessons={lessons} />
    </main>
  );
}
