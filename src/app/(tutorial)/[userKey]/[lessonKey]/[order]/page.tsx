import { GENERAL_SEO_INFO, OPEN_GRAPH, TWITTER } from "@/_core/catalogs/seo";
import { LessonPart } from "@/_core/components/part/part";
import { LessonPartData } from "@/_core/models/lesson/lesson-part-data.model";
import { Lesson } from "@/_core/models/lesson/lesson.model";
import { Metadata } from "next";

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

  const metadata: Metadata = buildPageMetadata(lesson);

  return metadata;
}

function buildPageMetadata(lesson: Lesson): Metadata {
  const generalInfo = Object.assign({}, GENERAL_SEO_INFO);
  generalInfo.title = lesson.name;

  const openGraph = Object.assign({}, OPEN_GRAPH);
  openGraph.title = lesson.name;
  if (lesson.posterImage !== null) openGraph.images[0].url = lesson.posterImage;

  const twitter = Object.assign({}, TWITTER);
  twitter.title = lesson.name;
  if (lesson.posterImage !== null) twitter.images[0].url = lesson.posterImage;

  return {
    ...generalInfo,
    openGraph,
    twitter,
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
      },
      cache: 'no-store',
    });

    const data: LessonPartData = await res.json();

    return <LessonPart data={data} userKey={userKey} />;

  } catch (e: any) {
    return <span>{e.message}</span>
  }
}