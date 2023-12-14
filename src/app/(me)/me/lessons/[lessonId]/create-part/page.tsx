import { MeCreatePart } from '@/_core/components/me/create-part/create-part';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Me | Create part',
}

interface MeCreatePartPageProps {
  params: {
    lessonId: string;
  }
}

export default function MeCreatePartPage({ params }: MeCreatePartPageProps) {
  return <MeCreatePart lessonId={params.lessonId} />;
}