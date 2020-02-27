import { assertStrictEq } from 'https://deno.land/std@v0.33.0/testing/asserts.ts'
import { insertObjectKey, AFTER_KEY } from '../lib/insert-object-key.ts'

Deno.test('insertObjectKey AFTER_KEY', () => {
  const object = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4
  } as const

  const result = insertObjectKey(
    object,
    'key' as const,
    'value' as const,
    AFTER_KEY('c')
  )

  assertStrictEq(
    JSON.stringify(result, undefined, 2),
    JSON.stringify({
      a: 0,
      b: 1,
      c: 2,
      key: 'value',
      d: 3,
      e: 4
    }, undefined, 2)
  )
})
