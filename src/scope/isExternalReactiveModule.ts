export function isExternalReactiveModule(modulePath: string): boolean {
  return modulePath.endsWith('.svelte') || modulePath.endsWith('.svelte.ts')
}
