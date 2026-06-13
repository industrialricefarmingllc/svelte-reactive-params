import * as ts from 'typescript'

import { renderProperty } from './renderProperty'

export function renderReactiveObjectLiteral(node: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile): string {
  const properties = node.properties.map((property) => renderProperty(property, sourceFile)).filter(Boolean)

  return `{ ${properties.join(', ')} }`
}
