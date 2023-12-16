//@ts-ignore
import { Registry } from 'monaco-textmate';
//@ts-ignore
import { wireTmGrammars } from 'monaco-editor-textmate';
//@ts-ignore
import { loadWASM } from 'onigasm';

let grammarsLoaded = false;

export async function liftOff(monaco: any) {
  if (grammarsLoaded) {
    return;
  }
  grammarsLoaded = true;
  
  await loadWASM('/assets/wasm/onigasm.wasm');

  const registry = new Registry({
    getGrammarDefinition: async () => {
      const grammar = {
        format: 'json' as 'json',
        content: await (await fetch(`/assets/grammers/JavaScript.tmLanguage.json`)).text()
      };
  
      return grammar;
    }
  });

  const grammers = new Map();
  grammers.set('javascript', 'source.js');

  await wireTmGrammars(monaco, registry, grammers);
}