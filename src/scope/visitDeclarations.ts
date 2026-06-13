import * as ts from 'typescript'

export function visitDeclarations(node: ts.Node, names: Set<string>): void {
  if (ts.isFunctionDeclaration(node) && node.name) {
    names.add(node.name.text)
  }

  if (ts.isClassDeclaration(node) && node.name) {
    names.add(node.name.text)
  }

  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
    names.add(node.name.text)
  }

  if (ts.isParameter(node) && ts.isIdentifier(node.name)) {
    names.add(node.name.text)
  }

  if (ts.isBindingElement(node) && ts.isIdentifier(node.name)) {
    names.add(node.name.text)
  }

  ts.forEachChild(node, (child) => visitDeclarations(child, names))
}
