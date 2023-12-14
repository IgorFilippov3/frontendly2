import React from 'react';
import Editor from '@monaco-editor/react';
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { defaultOptions } from '../catalogs/monaco-editor-options.catalog';

export const MonacoEditor = () => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  const getLanguage = (fileName: string): string => {
    if (fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.json')) return 'json';
    if (fileName.endsWith('.css')) return 'css';

    return 'javascript';
  };

  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language={getLanguage(sandpack.activeFile)}
          options={defaultOptions}
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
};