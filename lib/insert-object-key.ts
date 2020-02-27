interface ConditionParam<Object> {
  readonly keyBefore: keyof Object
  readonly keyAfter: keyof Object
  readonly valueBefore: Object[keyof Object]
  readonly valueAfter: Object[keyof Object]
}

export function insertObjectKey<
  Object,
  Key extends string | number,
  Value
> (
  object: Object,
  key: Key,
  value: Value,
  when: (param: ConditionParam<Object>) => boolean
): Object & {
  [_ in Key]: Value
} {
  const entries = Object.entries(object)

  if (!entries.length) {
    return { [key]: value } as any
  }

  for (let i = 0, j = 1; j !== entries.length; ++i, ++j) {
    const [keyBefore, valueBefore] = entries[i]
    const [keyAfter, valueAfter] = entries[j]
    const param = {
      keyBefore,
      keyAfter,
      valueBefore,
      valueAfter
    }
    if (when(param as any)) {
      const before = entries.slice(0, j)
      const after = entries.slice(j)
      const newEntries: [Key, Value][] = [...before, [key, value] as any, ...after]
      return Object.fromEntries(newEntries) as any
    }
  }

  return { ...object, [key]: value } as any
}
