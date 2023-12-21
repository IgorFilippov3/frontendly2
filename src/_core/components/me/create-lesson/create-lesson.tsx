'use client';

import { LessonAccessType, LessonAccessTypeItem } from "@/_core/models/lesson/lesson-access-type.model";
import { LessonContentType, LessonContentTypeItem } from "@/_core/models/lesson/lesson-content-type.model";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { TemplatePreview } from "../template-preview/template-preview";
import { MeBackButton } from "../back-button/back-button";

export const MeCreateLesson = () => {
  const router = useRouter();

  const contentTypeItems: LessonContentTypeItem[] = useMemo(() => {
    return LessonContentType.getItems();
  }, []);

  const [name, setName] = useState('');
  const [posterImage, setPosterImage] = useState('');
  const [contentType, setContentType] = useState<LessonContentType>(LessonContentType.html);
  const [accessType] = useState<LessonAccessType>(LessonAccessType.free);

  const [loading, setLoading] = useState(false);

  const renderMenuItems = (items: LessonContentTypeItem[] | LessonAccessTypeItem[]) => {
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

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        body: JSON.stringify({
          name, posterImage, contentType, accessType
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push('/me/lessons');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <MeBackButton url="/me/lessons" />
      <form onSubmit={submitForm}>
        <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
          Create lesson
        </Typography>
        <br />
        <TextField
          fullWidth
          type="text"
          label="Lesson name"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <br />
        <TextField
          fullWidth
          type="text"
          label="Poster image (optional)"
          variant="outlined"
          value={posterImage}
          onChange={e => setPosterImage(e.target.value)}
        />
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id="content-type-label">Content type</InputLabel>
          <Select
            labelId="content-type-label"
            label="Content type"
            value={contentType}
            onChange={e => setContentType(e.target.value as LessonContentType)}
            fullWidth>
            {renderMenuItems(contentTypeItems)}
          </Select>
        </FormControl>
        {/* <br />
      <br />
      <FormControl fullWidth>
        <InputLabel id="access-type-label">Access type</InputLabel>
        <Select
          labelId="access-type-label"
          label="Access type"
          value={accessType}
          onChange={e => setAccessType(e.target.value as LessonAccessType)}
          fullWidth>
          {renderMenuItems(accessTypeItems)}
        </Select>
      </FormControl> */}
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
      <div style={{ marginTop: 18 }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
          This is an example of lesson template, based on selected content type.
          <br />
          You can add your own files or overwrite these.
        </Typography>
        <TemplatePreview contentType={contentType} />
      </div>
    </>
  );
}