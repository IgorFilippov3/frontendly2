'use client';

import React from 'react';
import { SandpackLayout, SandpackPreview, SandpackProvider, SandpackFileExplorer } from '@codesandbox/sandpack-react';
import { MonacoEditor } from '../monaco-editor';
//@ts-ignore
// import { SandpackFileExplorer } from 'sandpack-file-explorer';
import './sandbox.css';
import { File } from '@/_core/models/file/file.model';
import { PartShortInfo } from '@/_core/models/part/part-short-info.model';
import { Part } from '@/_core/models/part/part.model';
import { PartContextType, usePart } from '../part/part-provider';

interface SandboxProps {
  files: File[] | undefined;
}

export const Sandbox = ({ files }: SandboxProps) => {
  const ctx: PartContextType | null = usePart();

  if (!files) return <span></span>;

  const getSandpackFileTree = (files: File[]) => {
    const tree: Record<string, string> = {};

    for (let file of files) {
      tree['/' + file.name] = file.code;
    }

    return tree;
  }

  const defineNextButton = () => {
    return ctx?.isLastPart()
      ? (
        <button
          className="next-button"
          onClick={ctx?.navigateToLessonsList}>
          Finish
        </button>
      )
      : (
        <button
          className="next-button"
          onClick={ctx?.navigateToNextPart}>
          Next
        </button>
      );
  }

  return (
    <SandpackProvider
      files={getSandpackFileTree(files)}
      template="react"
      theme="dark"
      options={{
        recompileMode: "delayed",
        recompileDelay: 300,
        classes: {
          "sp-wrapper": "custom-wrapper",
          "sp-layout": "custom-layout",
          "sp-tab-button": "custom-tab",
          'sp-tabs': 'custom-tabs',
          'sp-navigator': 'custom-navigator',
        },
      }}>
      <SandpackLayout>
        <SandpackFileExplorer />
        <MonacoEditor />
        <SandpackPreview
          style={{ height: "100vh" }}
          showNavigator={true}
          showOpenInCodeSandbox={false}
          actionsChildren={defineNextButton()}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
}