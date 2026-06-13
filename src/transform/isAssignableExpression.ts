import * as ts from 'typescript'

export function isAssignableExpression(node: ts.Expression): boolean {
  if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
    return true
  }

  if (ts.isParenthesizedExpression(node)) {
    return isAssignableExpression(node.expression)
  }

  return false
}
