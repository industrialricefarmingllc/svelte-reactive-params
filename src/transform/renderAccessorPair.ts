export function renderAccessorPair(name: string, getterValue: string, setterTarget: string | null): string {
  if (!setterTarget) {
    return `get ${name}() { return ${getterValue} }`
  }

  return `get ${name}() { return ${getterValue} }, set ${name}(value) { ${setterTarget} = value }`
}
