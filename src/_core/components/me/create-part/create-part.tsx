'use client';

import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MeCreatePartProps {
  lessonId: string;
}

export const MeCreatePart = ({ lessonId }: MeCreatePartProps) => {
  const router = useRouter();
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/parts', {
        method: 'POST',
        body: JSON.stringify({ name, lessonId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push(`/me/lessons/${lessonId}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitForm}>
      <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
        Create part
      </Typography>
      <br />
      <TextField
        fullWidth
        type="text"
        label="Part name"
        variant="outlined"
        value={name}
        onChange={e => setName(e.target.value)}
      />
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