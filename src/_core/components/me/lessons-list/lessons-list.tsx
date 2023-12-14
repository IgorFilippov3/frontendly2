'use client';

import { Lesson } from "@/_core/models/lesson/lesson.model";
import { UserRole } from "@/_core/models/user/user-role.model";
import { User } from "@/_core/models/user/user.model";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const MeLessonsList = () => {
  const { data } = useSession();
  const user: User = data?.user;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchLessons(user.role);
  }, [user.role]);

  const fetchLessons = async (mode: UserRole) => {
    try {
      const response = await fetch(`/api/lessons?mode=${mode}`);
      const lessons: Lesson[] = await response.json();
      setLessons(lessons);
    } catch (e) {
      console.error(e);
    }
  }

  const navigateToLesson = ({ id }: Lesson) => {
    router.push(`/me/lessons/${id}`);
  }

  const renderRows = (lessons: Lesson[]) => {
    return lessons.map(lesson => {
      return (
        <TableRow
          style={{ cursor: 'pointer' }}
          hover
          key={lesson.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={() => navigateToLesson(lesson)}>
          <TableCell component="th" scope="row">{lesson.name}</TableCell>
          <TableCell align="left">{lesson.key}</TableCell>
          <TableCell align="left">{lesson.contentType}</TableCell>
          <TableCell align="left">{lesson.accessType}</TableCell>
          <TableCell align="left">{lesson.published.toString()}</TableCell>
        </TableRow>
      )
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="lessons list table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Key</TableCell>
            <TableCell>Content Type</TableCell>
            <TableCell>Access Type</TableCell>
            <TableCell>Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(lessons)}</TableBody>
      </Table>
    </TableContainer>
  );
}