import { expect, test } from 'bun:test'

import { transformSvelteReactiveParams } from '../src/transform/transformSvelteReactiveParams'

test('rewrites imported function args into accessor backed values', () => {
  const input = `
<script lang="ts">
  import { countUp } from './lib/countUp.svelte.ts'

  let { count = 0, items = [1, 2, 3] } = $props()

  const result = countUp(count, items, 1 + count)
</script>
`

  const output = transformSvelteReactiveParams(input)

  expect(output).toContain('countUp({ get value() { return count }, set value(value) { count = value } }, { get value() { return items }, set value(value) { items = value } }, { get value() { return 1 + count } })')
})

test('leaves local functions alone', () => {
  const input = `
<script lang="ts">
  function createThing(options) {
    return options
  }

  const value = 1
  const result = createThing({ value })
</script>
`

  const output = transformSvelteReactiveParams(input)

  expect(output).toContain('const result = createThing({ value })')
})

test('keeps arrays, functions, and class instances inside external call args', () => {
  const input = `
<script lang="ts">
  import { renderWidget } from './lib/renderWidget.svelte.ts'

  class Sample {}

  const items = [1, 2, 3]
  const factory = () => 'ok'
  const sample = new Sample()

  renderWidget({ items, factory, sample })
</script>
`

  const output = transformSvelteReactiveParams(input)

  expect(output).toContain('get items() { return items }, set items(value) { items = value }')
  expect(output).toContain('get factory() { return factory }, set factory(value) { factory = value }')
  expect(output).toContain('get sample() { return sample }, set sample(value) { sample = value }')
})

test('wraps top level array and primitive arguments', () => {
  const input = `
<script lang="ts">
  import { countUp } from './lib/countUp.svelte.ts'

  let { count = 0 } = $props()

  countUp(count, [1, 2, 3], 1)
</script>
`

  const output = transformSvelteReactiveParams(input)

  expect(output).toContain('countUp({ get value() { return count }, set value(value) { count = value } }, { get value() { return [1, 2, 3] } }, { get value() { return 1 } })')
})
