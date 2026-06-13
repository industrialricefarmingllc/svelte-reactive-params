import * as ts from 'typescript'

import { getSetterTarget } from './getSetterTarget'
import { renderAccessorPair } from './renderAccessorPair'
import { renderReactiveObjectLiteral } from './renderReactiveObjectLiteral'

export function renderReactiveArgument(node: ts.Expression, sourceFile: ts.SourceFile): string {
  if (ts.isObjectLiteralExpression(node)) {
    return renderReactiveObjectLiteral(node, sourceFile)
  }

  const value = node.getText(sourceFile)
  const setterTarget = getSetterTarget(node, sourceFile)

  return `{ ${renderAccessorPair('value', value, setterTarget)} }`
}
