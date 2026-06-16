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

```svelte
<script lang="ts">
  import { countUp } from './lib/countUp.svelte.ts'

  let { counter = 0 } = $props()

  countUp({ get counter() { return counter }, set counter(v) { counter = v } })
</script>
```

Usage:

```ts
export function countUp(counter) {
  counter++ // updates in template thanks to the transformed setter keeping the script tag's scope
}
```

## Install

```bash
bun i @nicerice/svelte-reactive-params
```

## Use

```ts
// vite.config.ts
import { svelteReactiveParams } from 'svelte-reactive-params'

export default {
  plugins: [svelteReactiveParams()],
}
```
