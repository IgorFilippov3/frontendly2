import { MePart } from "@/_core/components/me/part/part";
import { Part } from "@/_core/models/part/part.model";

interface MePartPageProps {
  params: {
    lessonId: string,
    partId: string;
  }
}

export async function generateMetadata({ params }: MePartPageProps) {
  const res = await fetch(process.env.URL + `/api/part/${params.partId}`)
  const part: Part = await res.json();

  return {
    title: `Me | Part: ${part.name}`
  }
}

export default function MePartPage({ params }: MePartPageProps) {
  return <MePart lessonId={params.lessonId} partId={params.partId} />;
}