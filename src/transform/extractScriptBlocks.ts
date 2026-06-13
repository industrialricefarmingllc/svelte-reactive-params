export function extractScriptBlocks(code: string): Array<{ start: number; end: number }> {
  const blocks: Array<{ start: number; end: number }> = []
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/g
  let match: RegExpExecArray | null = null

  while ((match = scriptRegex.exec(code)) !== null) {
    const scriptStart = match.index + match[0].indexOf('>') + 1
    const scriptEnd = match.index + match[0].lastIndexOf('<')
    blocks.push({ start: scriptStart, end: scriptEnd })
  }

  return blocks
}
