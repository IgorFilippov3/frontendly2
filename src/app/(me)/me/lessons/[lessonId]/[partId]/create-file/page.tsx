import { MeCreateFile } from '@/_core/components/me/create-file/create-file';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Me | Create file',
}

interface MeCreateFilePageProps {
  params: {
    lessonId: string;
    partId: string;
  }
}

export default function MeCreateFilePage({ params }: MeCreateFilePageProps) {
  return <MeCreateFile lessonId={params.lessonId} partId={params.partId} />
}