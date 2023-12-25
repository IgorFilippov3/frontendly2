import { MePart } from "@/_core/components/me/part/part";
import type { Metadata } from 'next';

interface MePartPageProps {
  params: {
    lessonId: string,
    partId: string;
  },
  searchParams: {
    key: string;
  }
}

export const metadata: Metadata = {
  title: 'Me | Part',
}

export default function MePartPage({ params, searchParams }: MePartPageProps) {
  return <MePart lesssonKey={searchParams.key} lessonId={params.lessonId} partId={params.partId} />;
}