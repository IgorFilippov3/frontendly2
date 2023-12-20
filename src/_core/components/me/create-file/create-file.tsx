'use client';

import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMeState } from "../state-provider/state-provider";

interface MeCreateFileProps {
  partId: string;
}

export const MeCreateFile = ({ partId }: MeCreateFileProps) => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('/');

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const meState = useMeState();

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
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />
      <br />
      <TextField
        fullWidth
        type="text"
        label="File path"
        variant="outlined"
        value={path}
        onChange={e => setPath(e.target.value)}
      />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}>
          Create
        </Button>
      </div>
    </form>
  );
}