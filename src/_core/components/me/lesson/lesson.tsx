'use client';

import { Lesson } from "@/_core/models/lesson/lesson.model"
import { PartShortInfo } from "@/_core/models/part/part-short-info.model";
import { Button, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMeState } from "../state-provider/state-provider";
import { useSession } from "next-auth/react";
import { User } from "@/_core/models/user/user.model";
import { UserRole } from "@/_core/models/user/user-role.model";

interface MeLessonProps {
  lessonId: string;
}

export const MeLesson = ({ lessonId }: MeLessonProps) => {
  const { data } = useSession();
  const user: User = data?.user;

  const router = useRouter();
  const meState = useMeState();
  const [lesson, setLesson] = useState<Lesson>();
  const [posterImage, setPosterImage] = useState<string>('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetchLesson(lessonId);
  }, [lessonId]);

  const fetchLesson = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/lessons/${lessonId}?relation=parts`);
      const lesson: Lesson = await res.json();
      setLesson(lesson);
      setPosterImage(lesson.posterImage || '');
      setPublished(lesson.published);
    } catch (e) {
      console.error(e);
    }
  }

  const navigateToPart = (lesson: Lesson, part: PartShortInfo) => {
    router.push(`/me/lessons/${lesson.id}/${part.id}`);
  }

  const renderRows = (parts: PartShortInfo[] | undefined) => {
    if (!parts) return;

    return parts.map(part => {
      return (
        <TableRow
          style={{ cursor: 'pointer' }}
          hover
          key={part.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={() => navigateToPart(lesson!, part)}>
          <TableCell align="left">{part.order}</TableCell>
          <TableCell align="left">{part.name}</TableCell>
        </TableRow>
      )
    })
  }

  const renderPublishedInput = (role: UserRole) => {
    if (role === UserRole.user) return <span></span>;

    return (
      <>
        <br />
        <br />
        <FormControlLabel 
          control={lesson!.published ? <Switch defaultChecked /> : <Switch />} 
          label="Published"
          value={lesson!.published}
          //@ts-ignore
          onChange={e => setPublished(e.target.checked)}
        />
      </>
    );
  }

  const updateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch(`/api/lessons/${lessonId}`, {
        method: 'PUT',
        body: JSON.stringify({ 
          posterImage: posterImage.length === 0 ? null : posterImage,
          published, 
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      meState?.successMessage('Lesson was updated');
    } catch (e: any) {
      meState?.errorMessage(e.message);
    }
  }

  if (!lesson) return <span>Loading...</span>;

  return (
    <>
      <form onSubmit={updateLesson}>
        <TextField
          fullWidth
          type="text"
          label="Poster image (optional)"
          variant="outlined"
          value={posterImage}
          onChange={e => setPosterImage(e.target.value)}
        />
        {renderPublishedInput(user.role)}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary">
            Update lesson
          </Button>
        </div>
      </form>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="lessons list table">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows(lesson.parts)}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}