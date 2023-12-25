'use client';

import { Part } from "@/_core/models/part/part.model";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Typography } from '@mui/material';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import styles from './part.module.css';
import { MeFilesList } from "../files-list/files-list";
import { useMeState } from "../state-provider/state-provider";
import { MeBackButton } from "../back-button/back-button";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface MePartProps {
  lesssonKey: string;
  lessonId: string;
  partId: string;
}

const mdParser = new MarkdownIt();


export const MePart = ({ lesssonKey, lessonId, partId }: MePartProps) => {
  const { data } = useSession();
  const [part, setPart] = useState<Part>();
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const meState = useMeState();

  useEffect(() => {
    fetchPart(partId);
  }, [partId]);

  const fetchPart = async (partId: string) => {
    try {
      const res = await fetch(`/api/part/${partId}?relation=parts`);

      if (res.ok) {
        const part: Part = await res.json();
        setPart(part);
        setTask(part.taskMarkdown);
      }
    } catch (e) {
      console.error(e);
    }
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
      meState?.successMessage('Part was updated');
    } catch (e: any) {
      meState?.errorMessage(e.message);
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

  const handleChangeMarkdown = ({ text, html }: {
    text: string;
    html: string;
  }) => {
    setTask(text);
  }

  if (!part) return <span>Loading...</span>;

  return (
    <>
      <MeBackButton url={`/me/lessons/${lessonId}`} />
      <div className={styles.part}>
        <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
          {part.name}
        </Typography>
        <br />
        <div className={styles.editor}>
          {/* <MDEditor
            
          /> */}
          <MdEditor
            style={{ height: '100%' }}
            value={task || ''}
            renderHTML={text => mdParser.render(text)}
            onChange={value => handleChangeMarkdown(value)}
          />
        </div>
        <br />
        <Typography variant="subtitle1" component="div" sx={{ textAlign: 'right' }}>
          Use <a
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet"
            target="_blank">
            Markdown
          </a> to write and format posts.
        </Typography>
        <div className={styles.controls}>
          <Button variant="contained" color="warning" onClick={deletePart}>Delete</Button>
          {renderCopyFilesButton(part)}
          <div>
            <Link href={`/${data?.user.key}/${lesssonKey}/${part.order}`} target="_blank" passHref style={{ marginRight: 18 }}>
              <Button variant="contained">Preview</Button>
            </Link>
            <Button variant="contained" disabled={loading} onClick={savePart}>Save</Button>
          </div>
        </div>
        <div className={styles.files}>
          <div className={styles.filesControls}>
            <Button variant="contained" onClick={navigateToCreateFile}>Create file</Button>
          </div>
          <br />
          {renderMeFilesList(part)}
        </div>
      </div>
    </>
  );
}