'use client';

import { Part } from "@/_core/models/part/part.model";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { Button, Typography, styled } from '@mui/material';
import { defaultOptions } from '@/_core/catalogs/monaco-editor-options.catalog';

import styles from './part.module.css';
import { MeFilesList } from "../files-list/files-list";
import { useMeState } from "../state-provider/state-provider";
import { File } from "@/_core/models/file/file.model";

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
  const meState = useMeState();

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

  const copyFilesFromPreviousPart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/files/copy`, {
        method: 'POST',
        body: JSON.stringify({ lessonId, partId, order: part?.order })
      });
      const files = await response.json();

      setPart(part => {
        part!.files = files;
        return part;
      });
      meState?.successMessage('Files was copied');
    } catch (e: any) {
      meState?.errorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  const deletePart = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`/api/part/${partId}`, {
        method: 'DELETE'
      });

      meState?.successMessage('Part was deleted.');
      router.back();
    } catch (e: any) {
      meState?.errorMessage(e.message);
    }
  }

  const navigateToCreateFile = () => {
    router.push(`/me/lessons/${lessonId}/${partId}/create-file`);
  }

  const renderMeFilesList = (part: Part) => {
    if (part.files?.length === 0) {
      return <span></span>;
    }

    return (
      <MeFilesList
        lessonId={lessonId}
        partId={partId}
        files={part.files!}
      />
    );
  }

  const renderCopyFilesButton = (part: Part) => {
    if (part.files?.length || part.order === 1) {
      return <span></span>;
    }

    return (
      <Button
        variant="contained"
        disabled={loading}
        onClick={copyFilesFromPreviousPart}>
        Copy files from previous part
      </Button>
    );
  }

  if (!part) return <span>Loading...</span>;

  return (
    <div className={styles.part}>
      <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
        {part.name}
      </Typography>
      <br />
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
        <Button variant="contained" color="warning" onClick={deletePart}>Delete</Button>
        {renderCopyFilesButton(part)}
        <Button variant="contained" disabled={loading} onClick={savePart}>Save</Button>
      </div>
      <div className={styles.files}>
        <div className={styles.filesControls}>
          <Button variant="contained" onClick={navigateToCreateFile}>Create file</Button>
        </div>
        <br />
        {renderMeFilesList(part)}
      </div>
    </div>
  );
}