import { Typography } from "@mui/material";

import styles from './docs.module.css';
import Image from "next/image";

export const MeDocs = () => {
  return (
    <>
      <Typography variant="h3" component="h1" sx={{ textAlign: 'center', color: '#1c1e21' }}>
        Getting Started with Frontendly
      </Typography>
      <div className={styles.Docs}>
        <p className={styles.DocsP}>
          Frontendly is the place where you can create your own step-by-step guides without requiring users to
          switch to a separate local or online editor to reproduce your instructional material.
        </p>
        <p className={styles.DocsP}>
          To create your first lesson, go to the <span className={styles.DocsH}>Lessons</span> section and
          click the <span className={styles.DocsH}>Create lesson</span> button.
        </p>
        <p className={styles.DocsP}>
          Now, let&apos;s examine the lesson structure.
        </p>
        <Typography variant="h5" component="h5" sx={{ color: '#1c1e21', marginBottom: 2 }}>
          Lesson Structure
        </Typography>
        <p className={styles.DocsP}>
          <span className={styles.DocsH}>Lesson</span>
        </p>
        <p className={styles.DocsP}>
          Contains the guide title, optional poster, and content type that defines the sandbox (html, react, angular, etc.).
          Each sandbox has its own set of files. You can add your own or overwrite existing ones. All for your convenience.
        </p>

        <p className={styles.DocsP}>
          <span className={styles.DocsH}>Part</span>
        </p>
        <p className={styles.DocsP}>
          Each lesson can have an unlimited number of parts.
          A part includes the instructional text and a set of files.
        </p>

        <p className={styles.DocsP}>
          <span className={styles.DocsH}>Files</span>
        </p>
        <p className={styles.DocsP}>
          Use files to set the starting point for a part.
          Typically, files in the next part contain the final result of the files from the previous part.
        </p>

        <hr />

        <div className={styles.DocsFeelReady}>
          <p className={styles.DocsP}>
            When you feel that your lesson is ready to face the world, click this checkbox.
            Then, after moderation it will appear on the main page.
          </p>
          <Image
            src="/assets/images/ready-to-publish.png"
            alt="ready-to-publish"
            width={438}
            height={124}
          />
          <p className={styles.DocsP}>
            Then, after moderation it will appear on the main page.
          </p>
        </div>
      </div>
    </>
  );
}