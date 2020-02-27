interface ConditionParam<Object> {
  readonly keyBefore: keyof Object
  readonly keyAfter: keyof Object
  readonly valueBefore: Object[keyof Object]
  readonly valueAfter: Object[keyof Object]
}

interface WhenFn<Object> {
  (param: ConditionParam<Object>): boolean
}

export function insertObjectKey<
  Object,
  Key extends string | number,
  Value
> (
  object: Object,
  key: Key,
  value: Value,
  when: WhenFn<Object>
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

type ConPrmAny = ConditionParam<any>
type WhenKey = <Object> (key: keyof Object) => WhenFn<Object>
type WhenValue = <Object> (key: Object[keyof Object]) => WhenFn<Object>
export const BEFORE_KEY: WhenKey = k => (x: ConPrmAny) => x.keyAfter === k
export const AFTER_KEY: WhenKey = k => (x: ConPrmAny) => x.keyBefore === k
export const BEFORE_VALUE: WhenValue = v => (x: ConPrmAny) => x.valueAfter === v
export const AFTER_VALUE: WhenValue = v => (x: ConPrmAny) => x.valueAfter === v
