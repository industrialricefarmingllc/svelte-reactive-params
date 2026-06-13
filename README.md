# svelte-reactive-params

Makes any params passed to external functions reactive when changed and accessed there.

Rewrites object literal arguments passed to imported external calls into accessor-backed props, so reactive values stay live when they cross module boundaries.

- Only touches imported calls from `.svelte` and `.svelte.ts` modules
- Skips local functions
- Rewrites plain object arguments into getter and setter properties
- Leaves the rest of the file alone

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
