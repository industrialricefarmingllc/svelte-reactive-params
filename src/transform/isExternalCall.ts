import * as ts from 'typescript'

import { getRootIdentifier } from './getRootIdentifier'

export function isExternalCall(expression: ts.LeftHandSideExpression, externalNames: Set<string>, localNames: Set<string>): boolean {
  const rootName = getRootIdentifier(expression)

  return rootName !== null && externalNames.has(rootName) && !localNames.has(rootName)
}
