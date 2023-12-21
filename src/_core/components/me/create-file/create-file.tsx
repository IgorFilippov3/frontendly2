'use client';

import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMeState } from "../state-provider/state-provider";
import { MeBackButton } from "../back-button/back-button";

interface ValidationError {
  error: boolean;
  text?: string;
}

interface MeCreateFileProps {
  lessonId: string;
  partId: string;
}

export const MeCreateFile = ({ lessonId, partId }: MeCreateFileProps) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<ValidationError | null>(null);

  const [path, setPath] = useState('/');
  const [pathError, setPathError] = useState<ValidationError | null>(null);

  const [loading, setLoading] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const router = useRouter();
  const meState = useMeState();

  useEffect(() => {
    if (!pathError) return;

    setDisabledSubmit(pathError.error);

  }, [pathError]);

  useEffect(() => {
    if (!nameError) return;

    setDisabledSubmit(nameError.error);

  }, [nameError]);

  const handleNameChange = (e: any) => {
    const value: string = e.target.value;

    setName(value);

    if (value.includes('.')) {
      setNameError({ error: false });
    } else {
      setNameError({
        error: true,
        text: 'File name should include an extentsion'
      })
    }
  }

  const handlePathChange = (e: any) => {
    const value: string = e.target.value;

    setPath(value);

    if (value.startsWith('/') && value.endsWith('/')) {
      setPathError({ error: false });
    } else {
      setPathError({
        error: true,
        text: `Path should start and end with forward slash,`
      });
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`/api/files`, {
        method: 'POST',
        body: JSON.stringify({ name, path, type: null, partId }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      router.back();
      meState?.successMessage('File was created');
    } catch (e: any) {
      meState?.errorMessage(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <MeBackButton url={`/me/lessons/${lessonId}/${partId}`} />
      <form onSubmit={onSubmit}>
        <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
          Create file
        </Typography>
        <br />
        <TextField
          fullWidth
          type="text"
          label="File name"
          variant="outlined"
          error={nameError?.error}
          helperText={nameError?.text}
          value={name}
          onChange={e => handleNameChange(e)}
        />
        <br />
        <br />
        <TextField
          fullWidth
          type="text"
          label="File path"
          variant="outlined"
          error={pathError?.error}
          helperText={pathError?.text}
          value={path}
          onChange={e => handlePathChange(e)}
        />
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || disabledSubmit}>
            Create
          </Button>
        </div>
      </form>
    </>
  );
}