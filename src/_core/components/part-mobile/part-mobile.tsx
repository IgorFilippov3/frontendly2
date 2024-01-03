import { LessonPartData } from "@/_core/models/lesson/lesson-part-data.model";

import styles from './part-mobile.module.css';
import Link from "next/link";

interface LessonPartMobileProps {
  data: LessonPartData;
}

export const LessonPartMobile = ({ data }: LessonPartMobileProps) => {
  return (
    <div className={styles.Part}>
      <div>
        <Link className={styles.BackLink} href="/">Back to main page</Link>
      </div>
      <div className={styles.Hint}>
        To enhance your coding experience, access this page using a desktop computer.
      </div>
      <div className={styles.Task}>
        <div className={styles.TaskName}>{data.part.name}</div>
        <div
          className={styles.TaskContent}
          dangerouslySetInnerHTML={{ __html: data.part.taskHtml }}>
        </div>
      </div>
    </div>
  )
}