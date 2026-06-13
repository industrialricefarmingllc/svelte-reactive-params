import { collectDeclaredNames } from '../scope/collectDeclaredNames'
import { collectExternalImportNames } from '../scope/collectExternalImportNames'
import { extractScriptBlocks } from './extractScriptBlocks'
import { transformCallExpressions } from './transformCallExpressions'

export function transformSvelteReactiveParams(code: string, filePath = 'file.svelte'): string {
  const scripts = extractScriptBlocks(code)

  if (scripts.length === 0) {
    return code
  }

  let transformedCode = code

  for (const script of [...scripts].reverse()) {
    const scriptContent = code.slice(script.start, script.end)
    const externalNames = collectExternalImportNames(scriptContent)
    const localNames = collectDeclaredNames(scriptContent)
    const transformedScript = transformCallExpressions(scriptContent, externalNames, localNames, filePath)

    transformedCode = `${transformedCode.slice(0, script.start)}${transformedScript}${transformedCode.slice(script.end)}`
  }

  return transformedCode
}
