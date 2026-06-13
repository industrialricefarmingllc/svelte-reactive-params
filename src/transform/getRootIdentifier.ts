import * as ts from 'typescript'

export function getRootIdentifier(expression: ts.LeftHandSideExpression): string | null {
  if (ts.isIdentifier(expression)) {
    return expression.text
  }

  if (ts.isPropertyAccessExpression(expression) || ts.isElementAccessExpression(expression)) {
    return getRootIdentifier(expression.expression)
  }

  return null
}
