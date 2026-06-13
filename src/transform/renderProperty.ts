import * as ts from 'typescript'

import { getSetterTarget } from './getSetterTarget'
import { renderAccessorPair } from './renderAccessorPair'

export function renderProperty(property: ts.ObjectLiteralElementLike, sourceFile: ts.SourceFile): string {
  if (ts.isSpreadAssignment(property)) {
    return property.getText(sourceFile)
  }

  if (ts.isShorthandPropertyAssignment(property)) {
    const name = property.name.getText(sourceFile)
    return renderAccessorPair(name, name, name)
  }

  if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name)) {
    const name = property.name.text
    const value = property.initializer.getText(sourceFile)
    const setterTarget = getSetterTarget(property.initializer, sourceFile)

    return renderAccessorPair(name, value, setterTarget)
  }

  return property.getText(sourceFile)
}
