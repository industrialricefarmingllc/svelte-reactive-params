import * as ts from 'typescript'

import { visitDeclarations } from './visitDeclarations'

export function collectDeclaredNames(code: string): Set<string> {
  const names = new Set<string>()
  const sourceFile = ts.createSourceFile('file.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  visitDeclarations(sourceFile, names)

  return names
}
