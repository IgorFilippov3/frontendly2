import { Lesson } from '@/_core/models/lesson/lesson.model';
import styles from './lessons-list.module.css';
import { LessonCard } from '../lesson-card/lesson-card';

interface LessonsListProps {
  lessons: Lesson[];
}

export const LessonsList = ({ lessons }: LessonsListProps) => {

  const renderLessons = (lessons: Lesson[]) => {
    return lessons.map((lesson: Lesson) => {
      return <LessonCard key={lesson.id} lesson={lesson} />;
    });
  }

  if (!lessons) return <span>Loading...</span>;

  return (
    <section className={styles.list}>
      {renderLessons(lessons)}
    </section>
  );
}