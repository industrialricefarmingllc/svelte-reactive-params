import * as ts from 'typescript'

import { isExternalReactiveModule } from './isExternalReactiveModule'

export function visitImports(node: ts.Node, names: Set<string>): void {
  if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
    const modulePath = node.moduleSpecifier.text

    if (isExternalReactiveModule(modulePath)) {
      const importClause = node.importClause

      if (importClause?.name) {
        names.add(importClause.name.text)
      }

      if (importClause?.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
        for (const element of importClause.namedBindings.elements) {
          names.add(element.name.text)
        }
      }

      if (importClause?.namedBindings && ts.isNamespaceImport(importClause.namedBindings)) {
        names.add(importClause.namedBindings.name.text)
      }
    }
  }

  ts.forEachChild(node, (child) => visitImports(child, names))
}
