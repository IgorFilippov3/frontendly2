'use client';

import { File } from "@/_core/models/file/file.model";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { defaultOptions } from "@/_core/catalogs/monaco-editor-options.catalog";
import { Button, Typography } from "@mui/material";

import styles from './file.module.css';
import { useMeState } from "../state-provider/state-provider";
import { MeBackButton } from "../back-button/back-button";

interface MeFileProps {
  lessonId: string;
  partId: string;
  fileId: string;
}

export const MeFile = ({ lessonId, partId, fileId }: MeFileProps) => {
  const [file, setFile] = useState<File>();

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const monaco = useMonaco();
  const meState = useMeState();

  useEffect(() => {
    fetchFile(fileId);
  }, [fileId])

  useEffect(() => {
    initMonaco(monaco);
  }, [monaco])

  const initMonaco = (monaco: any) => {
    if (monaco === null) return;

    emmetHTML(monaco);
    emmetCSS(monaco);
    emmetJSX(monaco, ['javascript']);
  }

  const fetchFile = async (fileId: string) => {
    try {
      const res = await fetch(`/api/file/${fileId}`);
      const file: File = await res.json();
      setFile(file);
    } catch (e) {
      console.error(e);
    }
  }

  const updateFileCode = (code: string) => {
    setFile(file => {
      file!.code = code;
      return file;
    });
  }

  const saveFile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`/api/file/${fileId}`, {
        method: 'PUT',
        body: JSON.stringify(file),
        headers: {
          "Content-Type": "application/json",
        },
      });
      meState?.successMessage('File was saved.');
    } catch (e: any) {
      meState?.errorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  const deleteFile = async () => {
    try {
      await fetch(`/api/file/${fileId}`, {
        method: 'DELETE'
      });

      meState?.successMessage('File was deleted.');
      router.back();
    } catch (e: any) {
      meState?.errorMessage(e.message);
    }
  }

  if (!file) return <span>Loading...</span>;

  return (
    <div className={styles.file}>
      <MeBackButton url={`/me/lessons/${lessonId}/${partId}`} />
      <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
        {file.name}
      </Typography>
      <br />
      <div className={styles.editor}>
        <Editor
          width="100%"
          height="100%"
          language={file.type}
          options={defaultOptions}
          theme="light"
          defaultValue={file.code || ''}
          onChange={(value) => updateFileCode(value || '')}
        />
      </div>
      <div className={styles.fileControls}>
        <Button variant="contained" color="warning" onClick={deleteFile}>Delete</Button>
        <Button variant="contained" disabled={loading} onClick={saveFile}>Save</Button>
      </div>
    </div>
  );
}