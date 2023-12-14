import { Lesson } from "@/_core/models/lesson/lesson.model"
import Link from "next/link";
import styles from './lesson-card.module.css';
import Image from "next/image";
import { ContentTypeIcon } from "../../content-type-icon/content-type-icon";

interface LessonCardProps {
  lesson: Lesson;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const href: string = `/${lesson.user!.key}/${lesson.key}/1`;

  const image = (posterImage: string | null) => {
    if (posterImage === null) return <span
      style={{ width: 400, height: 180, flexShrink: 0, backgroundColor: '#e0eefd' }}>
    </span>

    return <Image
      src={lesson.posterImage!}
      alt={lesson.name}
      width={400}
      height={180}
      style={{ flexShrink: 0 }}
    />
  }

  return (
    <Link href={href} className={styles.card}>
      {image(lesson.posterImage)}
      <span className={styles.content}>
        <span className={styles.name}>{lesson.name}</span>
        <ContentTypeIcon type={lesson.contentType} style={{ fontSize: 32, marginBottom: 24 }} />
        <span className={styles.author}><b>Author:</b> {lesson.user!.name}</span>
      </span>
    </Link>
  );
}