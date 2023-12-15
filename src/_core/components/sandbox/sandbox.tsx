'use client';

import React from 'react';
import { SandpackLayout, SandpackPreview, SandpackProvider, SandpackFileExplorer } from '@codesandbox/sandpack-react';
import { MonacoEditor } from '../monaco-editor';
//@ts-ignore
// import { SandpackFileExplorer } from 'sandpack-file-explorer';
import './sandbox.css';
import { File } from '@/_core/models/file/file.model';
import { useRouter } from 'next/navigation';

interface SandboxProps {
  files: File[] | undefined;
  isLastPart: boolean;
  nextUrl: string;
}

export const Sandbox = ({ files, isLastPart, nextUrl }: SandboxProps) => {
  const router = useRouter();

  if (!files) return <span></span>;

  const getSandpackFileTree = (files: File[]) => {
    const tree: Record<string, string> = {};

    for (let file of files) {
      tree['/' + file.name] = file.code;
    }

    return tree;
  }

  const navigateNext = (url: string) => {
    router.push(url);
  }

  return (
    <SandpackProvider
      files={getSandpackFileTree(files)}
      template="react"
      theme="dark"
      options={{
        recompileMode: "delayed",
        recompileDelay: 600,
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
          actionsChildren={
            <button
              className="next-button"
              onClick={() => navigateNext(nextUrl)}>
              {isLastPart ? 'Finish' : 'Next'}
            </button>
          }
        />
      </SandpackLayout>
    </SandpackProvider>
  );
}