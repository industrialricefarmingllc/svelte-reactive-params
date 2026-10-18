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

  let counter = 0

  countUp(counter)
</script>
```

Vite will transform this behind the scenes into:

```svelte
<script lang="ts">
  import { countUp } from './lib/countUp.svelte.ts'

  let counter = 0

  countUp({ get counter() { return counter }, set counter(v) { counter = v } })
</script>
```

Then you can use it anywhere in another file like:

```ts
// someFunction.ts
export function countUp(counter) {
  counter++
}
```

Usually this wouldn't update the number in our template, because reactivity is tied to the scope of the template file,
but since we pass and access an object reference, JS carries over that template scope into any other place we need it.
And thanks to ES5 setters/getters, we don't even need to write our code differently to use it.

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
