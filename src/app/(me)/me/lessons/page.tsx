import { MeLessonsList } from "@/_core/components/me/lessons-list/lessons-list";
import { Button } from "@mui/material";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Me | Lessons',
}

export default function MeLessonsListPage() {
  return (
    <>
      <MeLessonsList />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
        <Link href="/me/lessons/create-lesson" passHref>
          <Button variant="contained">
            Create lesson
          </Button>
        </Link>
      </div>
    </>
  )
}
