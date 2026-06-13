import * as ts from 'typescript'

import { visitImports } from './visitImports'

export function collectExternalImportNames(code: string): Set<string> {
  const names = new Set<string>()
  const sourceFile = ts.createSourceFile('file.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  visitImports(sourceFile, names)

  return names
}
