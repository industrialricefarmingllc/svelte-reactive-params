import { expect, test } from 'bun:test'

import { transformSvelteReactiveParams } from '../src/transform/transformSvelteReactiveParams'

test('rewrites imported function args into accessor backed object values', () => {
  const input = `
<script lang="ts">
  import { renderWidget } from './lib/renderWidget.svelte.ts'

  let { title = 'hello', count = 0 } = $props()

  const result = renderWidget({ title, count, label: 1 + count })
</script>
`

  const output = transformSvelteReactiveParams(input)

  expect(output).toContain("get title() { return title }, set title(value) { title = value }")
  expect(output).toContain('get count() { return count }, set count(value) { count = value }')
  expect(output).toContain('get label() { return 1 + count }')
  expect(output).not.toContain('title, count')
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
