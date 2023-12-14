'use client';

import { FileType, FileTypeItem } from "@/_core/models/file/file-type.model";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface MeCreateFileProps {
  partId: string;
}

export const MeCreateFile = ({ partId }: MeCreateFileProps) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<FileType>(FileType.html);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fileTypeItems: FileTypeItem[] = useMemo(() => {
    return FileType.getItems();
  }, []);

  const renderMenuItems = (items: FileTypeItem[]) => {
    return items.map(item => {
      return (
        <MenuItem
          key={item.value}
          value={item.value}>
          {item.displayName}
        </MenuItem>
      )
    });
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`/api/files`, {
        method: 'POST',
        body: JSON.stringify({ name, type, partId }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      router.back();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
        Create part
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
      <FormControl fullWidth>
        <InputLabel id="file-type-label">File type</InputLabel>
        <Select
          labelId="file-type-label"
          label="File type"
          value={type}
          onChange={e => setType(e.target.value as FileType)}
          fullWidth>
          {renderMenuItems(fileTypeItems)}
        </Select>
      </FormControl>
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