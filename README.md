# svelte-reactive-params

Makes any params passed to external functions reactive when changed and accessed there.

## Why?
I like to use script tags for declarations exclusively, hiding logic until I need it; and I still like using svelte 4 syntax for simple projects, which badly needs such a mechanism in the absence of $state() runes.

## Transforms

Rewrites arguments passed to imported external calls into accessor-backed values, so reactive values stay live when they cross module boundaries.

Input:

```svelte
<script lang="ts">
  import { countUp } from './lib/countUp.svelte.ts'

  let { counter = 0 } = $props()

  countUp(counter)
</script>
```

Output:

The plugin rewrites that call so `countUp` receives a live wrapper around `counter`.

Usage:

```ts
export function countUp(args) {
  const { value } = args
  value++ // updates in template
}
```

## Install

```bash
bun add svelte-reactive-params
```

## Use

```ts
// vite.config.ts
import { svelteReactiveParams } from 'svelte-reactive-params'

export default {
  plugins: [svelteReactiveParams()],
}
```
