'use client';

import React from 'react';
import { SandpackLayout, SandpackPreview, SandpackProvider, SandpackFileExplorer, SandpackPredefinedTemplate, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { atomDark } from "@codesandbox/sandpack-themes";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import emmet from '@emmetio/codemirror-plugin';
//@ts-ignore
// import { SandpackFileExplorer } from 'sandpack-file-explorer';
import './sandbox.css';
import { File } from '@/_core/models/file/file.model';
import { useRouter } from 'next/navigation';
import { LessonContentType } from '@/_core/models/lesson/lesson-content-type.model';

interface SandboxProps {
  contentType: LessonContentType;
  files: File[] | undefined;
  isLastPart: boolean;
  nextUrl: string;
}

export const Sandbox = ({ contentType, files, isLastPart, nextUrl }: SandboxProps) => {
  const router = useRouter();

  if (!files) return <span></span>;

  const getSandpackFileTree = (files: File[]) => {
    const tree: Record<string, string> = {};

    for (let file of files) {
      tree['/' + file.name] = file.code || '';
    }

    return tree;
  }

  const getTemplate = (contentType: LessonContentType): SandpackPredefinedTemplate => {
    switch (contentType) {
      case LessonContentType.html:
      case LessonContentType.css:
        return 'static';
      case LessonContentType.javascript:
        return 'vanilla';
      case LessonContentType.typescript:
        return 'vanilla-ts';
      case LessonContentType.reactjs:
        return 'react';
      case LessonContentType.reactts:
        return 'react-ts';
      case LessonContentType.angular:
        return 'angular';
      default:
        throw new Error('Invalid lesson content type');
    }
  }

  const navigateNext = (url: string) => {
    router.push(url);
  }

  return (
    <SandpackProvider
      files={getSandpackFileTree(files)}
      template={getTemplate(contentType)}
      theme={atomDark}
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
        <SandpackCodeEditor
          className="fr-code-editor"
          extensions={[autocompletion()]}
          extensionsKeymap={[completionKeymap] as any}
          showTabs={true}
          closableTabs={true}
          showInlineErrors={true}
          showLineNumbers={true}
        />
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