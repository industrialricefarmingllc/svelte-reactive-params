import type { Plugin } from 'vite'

import { transformSvelteReactiveParams } from '../transform/transformSvelteReactiveParams'

export function createSvelteReactiveParamsPlugin(): Plugin {
  return {
    name: 'svelte-reactive-params',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.svelte')) {
        return null
      }

      const contents = transformSvelteReactiveParams(code, id)
      return contents === code ? null : contents
    },
  }
}
