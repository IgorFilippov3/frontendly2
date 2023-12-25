import { MeFile } from "@/_core/components/me/file/file";
import { Metadata } from 'next';

interface MeFilePageProps {
  params: {
    lessonId: string;
    partId: string;
    fileId: string;
  }
}

export const metadata: Metadata = {
  title: 'Me | File',
}

export default function MeFilePage({ params }: MeFilePageProps) {
  return <MeFile lessonId={params.lessonId} partId={params.partId} fileId={params.fileId} />;
}