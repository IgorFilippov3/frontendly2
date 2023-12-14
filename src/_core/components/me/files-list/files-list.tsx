'use client';

import { File } from "@/_core/models/file/file.model";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";

interface MeFilesListProps {
  lessonId: string;
  partId: string;
  files: File[];
}

export const MeFilesList = ({ lessonId, partId, files }: MeFilesListProps) => {
  const router = useRouter();

  const navigateToFile = ({ id }: File) => {
    router.push(`/me/lessons/${lessonId}/${partId}/${id}`);
  }

  const renderRows = (files: File[]) => {
    return files.map(file => {
      return (
        <TableRow
          style={{ cursor: 'pointer' }}
          hover
          key={file.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={() => navigateToFile(file)}>
          <TableCell align="left">{file.name}</TableCell>
          <TableCell align="left">{file.type}</TableCell>
        </TableRow>
      );
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
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(files)}</TableBody>
      </Table>
    </TableContainer>
  );
}