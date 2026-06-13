import * as ts from 'typescript'

import { isAssignableExpression } from './isAssignableExpression'

export function getSetterTarget(node: ts.Expression, sourceFile: ts.SourceFile): string | null {
  if (isAssignableExpression(node)) {
    return node.getText(sourceFile)
  }

  return null
}
