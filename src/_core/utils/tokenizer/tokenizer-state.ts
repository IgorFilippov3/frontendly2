import { StackElement } from 'monaco-textmate';

export class TokenizerState {
  constructor(public _ruleStack: StackElement) {
    this._ruleStack = _ruleStack
  }
  
  get ruleStack() {
    return this._ruleStack
  }
  
  clone() {
    return new TokenizerState(this._ruleStack)
  }
  
  equals(other: any) {
    if (!other || !(other instanceof TokenizerState) || other !== this || other._ruleStack !== this._ruleStack) {
      return false
    }
    return true
  }
}