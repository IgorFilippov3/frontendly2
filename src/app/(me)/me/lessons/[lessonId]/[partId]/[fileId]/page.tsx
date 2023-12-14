import { MeFile } from "@/_core/components/me/file/file";
import { File } from "@/_core/models/file/file.model";

interface MeFilePageProps {
  params: {
    lessonId: string;
    partId: string;
    fileId: string;
  }
}

export async function generateMetadata({ params: { fileId } }: MeFilePageProps) {
  const res = await fetch(process.env.URL + `/api/file/${fileId}`);
  const file: File = await res.json();

  return {
    title: `Me | File: ${file.name}`
  }
}

export default function MeFilePage({ params }: MeFilePageProps) {
  return <MeFile fileId={params.fileId} />;
}