import { INITIAL, Registry } from "monaco-textmate";
import { TokenizerState } from "./tokenizer-state";

/**
 * Wires up monaco-editor with monaco-textmate
 *
 * @param monaco monaco namespace this operation should apply to (usually the `monaco` global unless you have some other setup)
 * @param registry TmGrammar `Registry` this wiring should rely on to provide the grammars
 * @param languages `Map` of language ids (string) to TM names (string)
 */
export function wireTmGrammars(
  monaco: any, 
  registry: Registry, 
  languages: Map<string, any>
  ) {
  return Promise.all(
    Array.from(languages.keys()).map(async languageId => {
      try {
        const grammar = await registry.loadGrammar(languages.get(languageId));

        monaco.languages.setTokensProvider(languageId, {
          getInitialState: () => new TokenizerState(INITIAL),
          tokenize: (line: string, state: any) => {
            const res = grammar.tokenizeLine(line, state.ruleStack);

            return {
              endState: new TokenizerState(res.ruleStack),
              tokens: res.tokens.map(token => ({
                ...token,
                // TODO: At the moment, monaco-editor doesn't seem to accept array of scopes
                scopes: token.scopes[token.scopes.length - 1],
              })),
            };
          },
        });
      } catch (e) {
        console.warn(e);
      }
    })
  );
}