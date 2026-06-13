# svelte-reactive-params

Makes any params passed to external functions reactive when changed and accessed there.

## Why?
I like to use script tags for declarations exclusively, hiding logic until I need it; and I still like using svelte 4 syntax for simple projects, which badly needs such a mechanism in the absence of $state() runes.

## Transforms

Rewrites object literal arguments passed to imported external calls into accessor-backed props, so reactive values stay live when they cross module boundaries.

Input:

```svelte
<script lang="ts">
  import { renderWidget } from './lib/renderWidget.svelte.ts'

  let { title = 'hello' } = $props()

  renderWidget({ title })
</script>
```

Output:

```svelte
<script lang="ts">
  import { renderWidget } from './lib/renderWidget.svelte.ts'

  let { title = 'hello' } = $props()

  renderWidget({ get title() { return title }, set title(value) { title = value } })
</script>
```

## Install

```bash
bun add svelte-reactive-params
```

## Use

```ts
import { svelteReactiveParams } from 'svelte-reactive-params'

export default {
  plugins: [svelteReactiveParams()],
}
```
