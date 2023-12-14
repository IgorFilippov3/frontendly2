import { MeCreateLesson } from "@/_core/components/me/create-lesson/create-lesson";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Me | Create lesson',
}

export default function MeCreateLessonPage() {
  return <MeCreateLesson />;
}