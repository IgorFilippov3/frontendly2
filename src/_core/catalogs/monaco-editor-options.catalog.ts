import type { editor } from 'monaco-editor';

export const defaultOptions: editor.IStandaloneEditorConstructionOptions = {
  fontFamily: 'Menlo, Monaco, source-code-pro, Ubuntu Mono, DejaVu sans mono, Consolas, monospace',
  fontSize: 15,
  minimap: {
    enabled: false
  },
  tabSize: 2,
};