'use client';

import './template-preview.css';

import { LessonContentType } from "@/_core/models/lesson/lesson-content-type.model";
import { getSandboxTemplate } from "@/_core/utils/get-sandbox-template";
import { SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

interface TemplatePreviewProps {
  contentType: LessonContentType;
}

export const TemplatePreview = ({ contentType }: TemplatePreviewProps) => {
  return (
    <SandpackProvider
      template={getSandboxTemplate(contentType)}
      theme={atomDark}
      style={{}}
      options={{
        classes: {
          "sp-layout": "TemplatePreviewLayout",
        }
      }}>
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor readOnly={true} style={{ height: "100%" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}