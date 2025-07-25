'use client';

import React from 'react';
import { SandpackLayout, SandpackPreview, SandpackProvider, SandpackPredefinedTemplate, SandpackCodeEditor } from '@codesandbox/sandpack-react';
import { atomDark } from "@codesandbox/sandpack-themes";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
//@ts-ignore
import { SandpackFileExplorer } from 'sandpack-file-explorer';
import { abbreviationTracker } from '@emmetio/codemirror6-plugin';
import './sandbox.css';
import { File } from '@/_core/models/file/file.model';
import { useRouter } from 'next/navigation';
import { LessonContentType } from '@/_core/models/lesson/lesson-content-type.model';
import { getSandboxTemplate } from '@/_core/utils/get-sandbox-template';

interface SandboxProps {
  contentType: LessonContentType;
  files: File[] | undefined;
  isLastPart: boolean;
  nextUrl: string;
}

export const Sandbox = ({ contentType, files, isLastPart, nextUrl }: SandboxProps) => {
  const router = useRouter();

  const getSandpackFileTree = (files: File[]) => {
    const tree: Record<string, string> = {};

    for (let file of files) {
      tree[file.path + file.name] = file.code || '';
    }

    return tree;
  }

  const navigateNext = (url: string) => {
    router.push(url);
  }

  if (!files) return <span></span>;

  return (
    <SandpackProvider
      files={getSandpackFileTree(files)}
      template={getSandboxTemplate(contentType)}
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
          wrapContent
          className="fr-code-editor"
          extensions={[autocompletion(), abbreviationTracker()]}
          extensionsKeymap={[completionKeymap] as any}
          showTabs={true}
          closableTabs={true}
          showLineNumbers={true}
        />
        <SandpackPreview
          style={{ height: "100%" }}
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