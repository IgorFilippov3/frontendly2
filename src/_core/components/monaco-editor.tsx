import React, { useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { defaultOptions } from '../catalogs/monaco-editor-options.catalog';
import { getLanguageOfFile } from '../utils/get-language-of-file';
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';

export const MonacoEditor = () => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;

    emmetHTML(monaco);
    emmetCSS(monaco);
    emmetJSX(monaco, ['javascript']);
  }, [monaco]);


  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language={getLanguageOfFile(sandpack.activeFile)}
          options={defaultOptions}
          theme='vs-dark'
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
};