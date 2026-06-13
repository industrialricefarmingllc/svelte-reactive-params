import MagicString from 'magic-string'
import * as ts from 'typescript'

import { isExternalCall } from './isExternalCall'
import { renderReactiveObjectLiteral } from './renderReactiveObjectLiteral'

export function transformCallExpressions(code: string, externalNames: Set<string>, localNames: Set<string>, filePath: string): string {
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const string = new MagicString(code)

  visit(sourceFile)

  return string.toString()

  function visit(node: ts.Node): void {
    if (ts.isCallExpression(node) && isExternalCall(node.expression, externalNames, localNames)) {
      for (const arg of node.arguments) {
        if (ts.isObjectLiteralExpression(arg)) {
          string.overwrite(arg.getStart(sourceFile), arg.getEnd(), renderReactiveObjectLiteral(arg, sourceFile))
        }
      }
    }

    ts.forEachChild(node, visit)
  }
}
