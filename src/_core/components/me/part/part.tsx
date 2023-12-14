'use client';

import { Part } from "@/_core/models/part/part.model";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { Button, Typography, styled } from '@mui/material';
import { defaultOptions } from '@/_core/catalogs/monaco-editor-options.catalog';

import styles from './part.module.css';
import { MeFilesList } from "../files-list/files-list";

interface MePartProps {
  lessonId: string;
  partId: string;
}

export const MePart = ({ lessonId, partId }: MePartProps) => {
  const [part, setPart] = useState<Part>();
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);

  const monaco = useMonaco();
  const router = useRouter();

  useEffect(() => {
    fetchPart(partId);
  }, [partId]);

  useEffect(() => {
    initMonaco(monaco);
  }, [monaco]);

  const fetchPart = async (partId: string) => {
    try {
      const res = await fetch(`/api/part/${partId}?relation=parts`);
      const part: Part = await res.json();
      setPart(part);
      setTask(part.taskMarkdown);
    } catch (e) {
      console.error(e);
    }
  }

  const initMonaco = (monaco: any) => {
    if (monaco === null) return;

    emmetHTML(monaco);
    emmetCSS(monaco);
    emmetJSX(monaco, ['javascript']);
  }

  const savePart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`/api/part/${partId}`, {
        method: 'PUT',
        body: JSON.stringify({ task }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const navigateToCreateFile = () => {
    router.push(`/me/lessons/${lessonId}/${partId}/create-file`);
  }

  if (!part) return <span>Loading...</span>;

  return (
    <div className={styles.part}>
      <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
        {part.name}
      </Typography>
      <div className={styles.editor}>
        <Editor
          width="100%"
          height="100%"
          language="html"
          options={defaultOptions}
          theme="light"
          defaultValue={part.taskMarkdown}
          onChange={(value) => setTask(value || '')}
        />
      </div>
      <div className={styles.controls}>
        <Button variant="contained" disabled={loading} onClick={savePart}>Save</Button>
      </div>
      <div className={styles.files}>
        <div className={styles.filesControls}>
          <Button variant="contained" onClick={navigateToCreateFile}>Create file</Button>
        </div>
        <br />
        {part.files?.length && <MeFilesList
          lessonId={lessonId}
          partId={partId}
          files={part.files}
        />}
      </div>
    </div>
  );
}